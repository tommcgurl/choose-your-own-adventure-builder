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
        [...drafts],
        Cmd.run(apolloClient.query, {
          args: [{ query: GET_DRAFTS }],
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        })
      );
    case types.FETCH_DRAFTS_SUCCESS:
      return [...action.drafts];
    case types.FETCH_DRAFTS_FAIL:
      return [...drafts];
    case types.CREATE_DRAFT:
      return loop(
        [...drafts, action.draft],
        Cmd.run(DraftService.createDraft, {
          args: [action.draft],
          successActionCreator: createDraftSuccess,
          failActionCreator: createDraftFail,
        })
      );
    case types.CREATE_DRAFT_SUCCESS:
      // TODO ?
      return [...drafts];
    case types.CREATE_DRAFT_FAIL:
      // TODO ?
      return [...drafts];
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
      return drafts.map(draft => {
        if (draft.id === action.adventureId) {
          if (action.storyPartKey === 'intro') {
            return {
              ...draft,
              intro: convertToRaw(action.editorState.getCurrentContent()),
            };
          }
          return {
            ...draft,
            mainStory: {
              ...draft.mainStory,
              storyParts: {
                ...draft.mainStory.storyParts,
                [action.storyPartKey]: {
                  ...draft.mainStory.storyParts[action.storyPartKey],
                  plot: convertToRaw(action.editorState.getCurrentContent()),
                },
              },
            },
          };
        }
        return { ...draft };
      });
    case types.ADD_STORY_PART: {
      let updatedDraft;
      return loop(
        drafts.map(draft => {
          if (draft.id === action.draftId) {
            updatedDraft = {
              ...draft,
              mainStory: {
                ...draft.mainStory,
                storyParts: {
                  ...draft.mainStory.storyParts,
                  [action.key]: {
                    plot: convertToRaw(ContentState.createFromText('')),
                  },
                },
              },
            };
            return updatedDraft;
          }
          return { ...draft };
        }),
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] })
      );
    }
    case types.CHANGE_STORY_PART_KEY: {
      let updatedDraft;
      return loop(
        drafts.map(draft => {
          if (draft.id === action.draftId) {
            const storyPart = {
              ...draft.mainStory.storyParts[action.oldKey],
            };
            updatedDraft = { ...draft };
            delete updatedDraft.mainStory.storyParts[action.oldKey];
            Object.keys(updatedDraft.mainStory.storyParts).forEach(key => {
              const prompt = updatedDraft.mainStory.storyParts[key].prompt;
              if (prompt && Array.isArray(prompt.choices)) {
                prompt.choices = prompt.choices.map(choice => {
                  if (choice.nextBranch === action.oldKey) {
                    return { ...choice, nextBranch: action.newKey };
                  }
                  return choice;
                });
              }
            });

            updatedDraft = {
              ...updatedDraft,
              mainStory: {
                ...updatedDraft.mainStory,
                storyParts: {
                  ...updatedDraft.mainStory.storyParts,
                  [action.newKey]: storyPart,
                },
              },
            };
            return updatedDraft;
          }
          return { ...draft };
        }),
        Cmd.run(DraftService.updateDraft, { args: [updatedDraft] })
      );
    }
    default:
      return [...drafts];
  }
}
