import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import localforage from 'localforage';
import { STORAGE_ID } from '../constants';

export default class StatePersistenceService {
  static async perisistState(state) {
    const storageFriendlyState = {
      ...state,
      editor: {
        ...state.editor,
        editor: {
          ...state.editor.editor,
          state: convertToRaw(state.editor.editor.state.getCurrentContent()),
        },
      },
    };
    await localforage.setItem(STORAGE_ID, storageFriendlyState);
    try {
      const persistedState = await localforage.getItem(STORAGE_ID);
      if (persistedState) {
        console.log(
          '%cCurrent progress successfully saved.',
          'color: green; font-weight: 600'
        );
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Failed to save progress');
    }
  }

  static async getPersistedState() {
    const persistedState = await localforage.getItem(STORAGE_ID);
    if (persistedState) {
      return {
        ...persistedState,
        editor: {
          ...persistedState.editor,
          editor: {
            ...persistedState.editor.editor,
            state: EditorState.createWithContent(
              convertFromRaw(persistedState.editor.editor.state)
            ),
          },
        },
      };
    }
  }
}
