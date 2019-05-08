import { loop, Cmd } from 'redux-loop';
import { convertToRaw, ContentState } from 'draft-js';
import initialState from '../store/initialState';
import * as types from '../constants/actionTypes';
import DraftService from '../services/DraftService';
import {
  fetchDraftsSuccess,
  fetchDraftsFail,
  createDraftSuccess,
  createDraftFail,
  fetchDraftSuccess,
  fetchDraftFail,
} from '../actions/draftActions';
import apolloClient from '../services/apolloClient';
import { GET_DRAFTS } from '../constants/queries';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case types.FETCH_DRAFTS:
      return loop(
        { ...drafts },
        Cmd.run(apolloClient.query, {
          args: [{ query: GET_DRAFTS }],
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        }),
      );
    case types.FETCH_DRAFTS_SUCCESS:
      return { ...action.drafts };
    case types.FETCH_DRAFTS_FAIL:
      return drafts;
    case types.CREATE_DRAFT:
      return loop(
        {
          ...drafts,
          [action.draft.id]: action.draft,
        },
        Cmd.run(DraftService.createDraft, {
          args: [action.draft],
          successActionCreator: createDraftSuccess,
          failActionCreator: createDraftFail,
        }),
      );
    case types.CREATE_DRAFT_SUCCESS:
      // TODO ?
      return drafts;
    case types.CREATE_DRAFT_FAIL:
      // TODO ?
      return drafts;
    // These may be unnecessary
    // case types.SELECT_DRAFT:
    //   return loop(
    //     [...drafts],
    //     Cmd.run(DraftService.getDraft, {
    //       args: [action.id],
    //       successActionCreator: fetchDraftSuccess,
    //       failActionCreator: fetchDraftFail,
    //     }),
    //   );
    // case types.FETCH_DRAFT_SUCCESS:
    //   return drafts.map(draft => {
    //     if (draft.id === action.draft.id) {
    //       return { ...action.draft };
    //     }
    //     return { ...draft };
    //   });
    // case types.FETCH_DRAFT_FAIL:
    //   return [...drafts];
    case types.EDITOR_CHANGE:
      const { editorState, storyPartKey, adventureId } = action;
      const currentDraft = { ...drafts[adventureId] };
      const updatedDraft = {
        ...currentDraft,
        intro:
          storyPartKey === 'intro'
            ? convertToRaw(editorState.getCurrentContent())
            : currentDraft.intro,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [storyPartKey]: {
              ...currentDraft.mainStory.storyParts[storyPartKey],
              plot: convertToRaw(editorState.getCurrentContent()),
            },
          },
        },
      };
      return {
        ...drafts,
        [adventureId]: updatedDraft,
      };
    case types.ADD_STORY_PART: {
      const { key, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [key]: {
              plot: convertToRaw(ContentState.createFromText('')),
            },
          },
        },
      };
      return loop(
        {
          ...drafts,
          [draftId]: updatedDraft,
        },
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] }),
      );
    }
    case types.CHANGE_STORY_PART_KEY: {
      const { newKey, oldKey, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryParts = currentDraft.mainStory.storyParts;
      let updatedStoryParts = {
        ...currentStoryParts,
        [newKey]: currentStoryParts[oldKey],
      };
      delete updatedStoryParts[oldKey];
      // Make sure to remove any branches referencing the old branch ID and
      // point them to the new ID
      updatedStoryParts = Object.keys(updatedStoryParts).reduce(
        (acc, storyPartId) => {
          let story = updatedStoryParts[storyPartId];
          if (story.prompt && Array.isArray(story.prompt.choices)) {
            story.prompt.choices = story.prompt.choices.map(choice => {
              if (choice.nextBranch === oldKey) {
                return { ...choice, nextBranch: newKey };
              }
              return choice;
            });
          }
          return {
            ...acc,
            [storyPartId]: story,
          };
        },
        {},
      );
      // We can now remove the old key
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: updatedStoryParts,
        },
      };
      return loop(
        {
          ...drafts,
          [draftId]: updatedDraft,
        },
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] }),
      );
    }
    case types.SELECT_STORY_PART_NEXT_BRANCH_ID: {
      const { storyPartId, draftId, nextBranchId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [storyPartId]: {
              ...currentDraft.mainStory.storyParts[storyPartId],
              nextBranchId,
            },
          },
        },
      };
      return loop(
        {
          ...drafts,
          [draftId]: updatedDraft,
        },
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] }),
      );
    }
    case types.ADD_USER_CHOICE: {
      const { choiceText, choiceBranchId, storyPartId, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.mainStory.storyParts[storyPartId];
      const newChoice = {
        text: choiceText,
        nextBranch: choiceBranchId,
      };
      let updatedStoryPart = { ...currentStoryPart };
      if (!updatedStoryPart.prompt) {
        updatedStoryPart.prompt = {
          text: '',
          choices: [],
        };
      }
      updatedStoryPart = {
        ...updatedStoryPart,
        prompt: {
          ...updatedStoryPart.prompt,
          choices: [...updatedStoryPart.prompt.choices, newChoice],
        },
      };
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [storyPartId]: updatedStoryPart,
          },
        },
      };
      return loop(
        {
          ...drafts,
          [draftId]: updatedDraft,
        },
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] }),
      );
    }
    default:
      return drafts;
  }
}
