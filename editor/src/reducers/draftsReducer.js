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
import Adventure from '../models/Adventure';

export default function draftsReducer(drafts = initialState.drafts, action) {
  switch (action.type) {
    case types.FETCH_DRAFTS:
      return loop(
        [...drafts],
        Cmd.run(DraftService.getDrafts, {
          successActionCreator: fetchDraftsSuccess,
          failActionCreator: fetchDraftsFail,
        }),
      );
    case types.FETCH_DRAFTS_SUCCESS:
      return [...action.drafts];
    case types.FETCH_DRAFTS_FAIL:
      return [...drafts];
    case types.CREATE_DRAFT:
      const adventure = new Adventure(action.title);
      return loop(
        [...drafts, adventure],
        Cmd.run(DraftService.createDraft, {
          args: [adventure],
          successActionCreator: createDraftSuccess,
          failActionCreator: createDraftFail,
        }),
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
    case types.ADD_STORY_PART:
      return drafts.map(draft => {
        if (draft.id === action.adventureId) {
          return {
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
        }
        return { ...draft };
      });
    default:
      return [...drafts];
  }
}
