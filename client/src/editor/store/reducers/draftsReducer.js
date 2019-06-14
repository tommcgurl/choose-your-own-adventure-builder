import { ContentState, convertToRaw } from 'draft-js';
import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import draftService from '../../services/draftService';
import {
  createDraftFail,
  fetchAdventuresAuthoredByUserFail,
  fetchAdventuresAuthoredByUserSuccess,
  publishAdventureSuccess,
  saveAdventureSuccess,
} from '../actions/draftActions';
import initialState from '../initialState';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case types.FETCH_DRAFTS_AUTHORED_BY_USER: {
      return loop(
        { ...drafts },
        Cmd.run(draftService.getAdventuresAuthoredByUser, {
          successActionCreator: fetchAdventuresAuthoredByUserSuccess,
          failActionCreator: fetchAdventuresAuthoredByUserFail,
        })
      );
    }
    case types.FETCH_ADVENTURES_AUTHORED_BY_USER_SUCCESS: {
      const drafts = action.adventures
        .filter(a => !a.published)
        .reduce((acc, nextDraft) => {
          return {
            ...acc,
            [nextDraft.id]: nextDraft,
          };
        }, {});
      return drafts;
    }
    case types.FETCH_ADVENTURES_AUTHORED_BY_USER_FAIL: {
      return drafts;
    }
    case types.CREATE_DRAFT: {
      return loop(
        {
          ...drafts,
          [action.draft.id]: action.draft,
        },
        Cmd.run(draftService.saveAdventure, {
          args: [action.draft],
          successActionCreator: saveAdventureSuccess,
          failActionCreator: createDraftFail,
        })
      );
    }
    case types.CREATE_DRAFT_FAIL: {
      // TODO ?
      return drafts;
    }
    case types.SAVE_STORY_PART: {
      const { editorState, storyPartKey, draftId } = action;
      const currentDraft = { ...drafts[draftId] };
      const updatedDraft = {
        ...currentDraft,
        intro:
          storyPartKey === 'intro'
            ? convertToRaw(editorState.getCurrentContent())
            : currentDraft.intro,
        mainStory:
          storyPartKey === 'intro'
            ? currentDraft.mainStory
            : {
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
      return loop(
        {
          ...drafts,
          [draftId]: updatedDraft,
        },
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
      );
    }
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
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
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
        {}
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
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
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
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
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
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
      );
    }
    case types.REMOVE_USER_CHOICE: {
      const { choiceText, storyPartId, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.mainStory.storyParts[storyPartId];
      let updatedStoryPart = { ...currentStoryPart };
      if (!updatedStoryPart.prompt) {
        updatedStoryPart.prompt = {
          text: '',
          choices: [],
        };
      }
      const newChoices = updatedStoryPart.prompt.choices.filter(choice => {
        return choice.text !== choiceText;
      });
      updatedStoryPart = {
        ...updatedStoryPart,
        prompt: {
          ...updatedStoryPart.prompt,
          choices: newChoices,
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
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
      );
    }
    case types.DELETE_DRAFT: {
      const updatedDrafts = { ...drafts };
      delete updatedDrafts[action.draftId];
      return loop(
        updatedDrafts,
        Cmd.run(draftService.deleteDraft, { args: [action.draftId] })
      );
    }
    case types.CHANGE_GENRE: {
      const updatedDraft = { ...drafts[action.draftId], genre: action.genre };
      return loop(
        {
          ...drafts,
          [action.draftId]: updatedDraft,
        },
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
      );
    }
    case types.PUBLISH_ADVENTURE: {
      const draftToPublish = {
        ...drafts[action.draftId],
        published: new Date().toISOString(),
      };

      const updatedDrafts = { ...drafts };
      delete updatedDrafts[action.draftId];

      return loop(
        updatedDrafts,
        Cmd.run(draftService.saveAdventure, {
          args: [draftToPublish],
          successActionCreator: publishAdventureSuccess,
        })
      );
    }
    case types.CHANGE_COVER_IMAGE: {
      const updatedDraft = {
        ...drafts[action.draftId],
        coverImage: action.imageUrl,
      };
      return loop(
        { ...drafts, [action.draftId]: updatedDraft },
        Cmd.run(draftService.saveAdventure, {
          args: [updatedDraft],
          successActionCreator: saveAdventureSuccess,
        })
      );
    }
    default:
      return drafts;
  }
}
