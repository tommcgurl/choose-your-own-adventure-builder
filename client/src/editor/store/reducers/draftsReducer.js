import { ContentState, convertToRaw } from 'draft-js';
import { Cmd, loop } from 'redux-loop';
import uuid from 'uuid/v4';
import { popToast, TOAST_VARIANTS } from '../../../shared/components/Toast';
import draftService from '../../services/draftService';
import {
  fetchDraftsFail,
  fetchDraftsSuccess,
  publishAdventureSuccess,
  saveAdventureFail,
  saveAdventureSuccess,
  types,
} from '../actions/draftActions';
import initialState from '../initialState';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case types.FETCH_DRAFTS: {
      return loop(
        { ...drafts },
        Cmd.run(draftService.getDrafts, {
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        })
      );
    }
    case types.FETCH_DRAFTS_SUCCESS: {
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
    case types.FETCH_DRAFTS_FAIL: {
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
          failActionCreator: error =>
            saveAdventureFail(action.type, action.draft.id, error),
        })
      );
    }

    case types.SAVE_STORY_PART_PLOT: {
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
        })
      );
    }
    case types.ADD_STORY_PART: {
      const { name, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [uuid()]: {
              name,
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
        })
      );
    }
    case types.DELETE_STORY_PART: {
      const { key, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedStoryParts = { ...currentDraft.mainStory.storyParts };
      delete updatedStoryParts[key];
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
        })
      );
    }
    case types.CHANGE_STORY_PART_NAME: {
      const { name, storyPartKey, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [storyPartKey]: {
              ...currentDraft.mainStory.storyParts[storyPartKey],
              name,
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
        })
      );
    }
    case types.CHANGE_PROMPT_TEXT: {
      const { promptText, storyPartKey, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.mainStory.storyParts[storyPartKey];
      let updatedStoryPart = { ...currentStoryPart };
      if (!updatedStoryPart.prompt) {
        updatedStoryPart.prompt = {
          text: promptText,
          choices: [],
        };
      }
      updatedStoryPart = {
        ...updatedStoryPart,
        prompt: {
          ...updatedStoryPart.prompt,
          text: promptText,
        },
      };
      const updatedDraft = {
        ...currentDraft,
        mainStory: {
          ...currentDraft.mainStory,
          storyParts: {
            ...currentDraft.mainStory.storyParts,
            [storyPartKey]: updatedStoryPart,
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
        })
      );
    }
    case types.ADD_USER_CHOICE: {
      const {
        choiceText,
        choiceBranchId,
        choiceBranchName,
        storyPartId,
        draftId,
      } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.mainStory.storyParts[storyPartId];
      const newChoice = {
        text: choiceText,
        nextBranch: choiceBranchId,
        nextBranchName: choiceBranchName,
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
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
          failActionCreator: error =>
            saveAdventureFail(action.type, draftId, error),
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
          failActionCreator: error =>
            saveAdventureFail(action.type, action.draftId, error),
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
          failActionCreator: error =>
            saveAdventureFail(action.type, action.draftId, error),
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
          failActionCreator: error =>
            saveAdventureFail(action.type, action.draftId, error),
        })
      );
    }
    case types.SAVE_ADVENTURE_SUCCESS: {
      return drafts;
    }
    case types.SAVE_ADVENTURE_FAIL: {
      return loop(
        drafts,
        Cmd.list([
          Cmd.run(popToast, {
            args: ['Failed to save draft.', TOAST_VARIANTS.ERROR],
          }),
          Cmd.run(console.log, {
            args: [action.error],
          }),
        ])
      );
    }
    default:
      return drafts;
  }
}
