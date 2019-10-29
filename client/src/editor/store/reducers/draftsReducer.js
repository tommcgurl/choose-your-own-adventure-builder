import { ContentState, convertToRaw } from 'draft-js';
import { Cmd, loop } from 'redux-loop';
import { popToast, TOAST_VARIANTS } from '../../../shared/components/Toast';
import { AUTHENTICATED } from '../../../shared/store/actions/authActions';
import draftService from '../../services/draftService';
import {
  ADD_STORY_PART,
  ADD_USER_CHOICE,
  CHANGE_COVER_IMAGE,
  CHANGE_GENRE,
  CHANGE_PROMPT_TEXT,
  CHANGE_STORY_PART_NAME,
  CREATE_DRAFT,
  DELETE_DRAFT,
  DELETE_STORY_PART,
  fetchDraftsFail,
  fetchDraftsSuccess,
  FETCH_DRAFTS,
  FETCH_DRAFTS_FAIL,
  FETCH_DRAFTS_SUCCESS,
  publishAdventureSuccess,
  PUBLISH_ADVENTURE,
  REMOVE_USER_CHOICE,
  saveAdventureFail,
  saveAdventureSuccess,
  SAVE_ADVENTURE_FAIL,
  SAVE_ADVENTURE_SUCCESS,
  SAVE_STORY_PART_PLOT,
  SET_FIRST_PART_ID,
  CHANGE_DRAFT_TITLE,
} from '../actions/draftActions';
import initialState from '../initialState';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case AUTHENTICATED:
    case FETCH_DRAFTS: {
      return loop(
        { ...drafts },
        Cmd.run(draftService.getDrafts, {
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        })
      );
    }
    case FETCH_DRAFTS_SUCCESS: {
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
    case FETCH_DRAFTS_FAIL: {
      return drafts;
    }
    case CREATE_DRAFT: {
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
    case SAVE_STORY_PART_PLOT: {
      const { editorState, storyPartKey, draftId } = action;
      const currentDraft = { ...drafts[draftId] };
      const updatedDraft =
        storyPartKey === 'blurb'
          ? {
            ...currentDraft,
            blurb: convertToRaw(editorState.getCurrentContent()),
          }
          : {
            ...currentDraft,
            storyParts: {
              ...currentDraft.storyParts,
              [storyPartKey]: {
                ...currentDraft.storyParts[storyPartKey],
                plot: convertToRaw(editorState.getCurrentContent()),
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
    case ADD_STORY_PART: {
      const { storyPartId, storyPartName, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        storyParts: {
          ...currentDraft.storyParts,
          [storyPartId]: {
            name: storyPartName,
            plot: convertToRaw(ContentState.createFromText('')),
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
    case DELETE_STORY_PART: {
      const { key, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedStoryParts = { ...currentDraft.storyParts };
      delete updatedStoryParts[key];
      const updatedDraft = {
        ...currentDraft,
        storyParts: updatedStoryParts,
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
    case CHANGE_STORY_PART_NAME: {
      const { name, storyPartKey, draftId } = action;
      const currentDraft = drafts[draftId];
      const updatedDraft = {
        ...currentDraft,
        storyParts: {
          ...currentDraft.storyParts,
          [storyPartKey]: {
            ...currentDraft.storyParts[storyPartKey],
            name,
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
    case CHANGE_PROMPT_TEXT: {
      const { promptText, storyPartKey, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.storyParts[storyPartKey];
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
        storyParts: {
          ...currentDraft.storyParts,
          [storyPartKey]: updatedStoryPart,
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
    case ADD_USER_CHOICE: {
      const { choiceText, choiceBranchId, storyPartId, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.storyParts[storyPartId];
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
        storyParts: {
          ...currentDraft.storyParts,
          [storyPartId]: updatedStoryPart,
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
    case REMOVE_USER_CHOICE: {
      const { choiceText, storyPartId, draftId } = action;
      const currentDraft = drafts[draftId];
      const currentStoryPart = currentDraft.storyParts[storyPartId];
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
        storyParts: {
          ...currentDraft.storyParts,
          [storyPartId]: updatedStoryPart,
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
    case DELETE_DRAFT: {
      const updatedDrafts = { ...drafts };
      delete updatedDrafts[action.draftId];
      return loop(
        updatedDrafts,
        Cmd.run(draftService.deleteDraft, { args: [action.draftId] })
      );
    }
    case CHANGE_GENRE: {
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
    case PUBLISH_ADVENTURE: {
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
    case CHANGE_COVER_IMAGE: {
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
    case SAVE_ADVENTURE_SUCCESS: {
      return drafts;
    }
    case SAVE_ADVENTURE_FAIL: {
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
    case SET_FIRST_PART_ID: {
      const updatedDraft = {
        ...drafts[action.draftId],
        firstPartId: action.firstPartKey,
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
    case CHANGE_DRAFT_TITLE: {
      const updatedDraft = {
        ...drafts[action.draftId],
        title: action.newTitle,
      };
      // TODO return loop
    }
    default:
      return drafts;
  }
}
