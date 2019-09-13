import initialEditorState from '../../editor/store/initialState';
import initialReaderState from '../../reader/store/initialState';
import { SERIF } from '../constants/fontTypes';

export default {
  reader: initialReaderState,
  editor: initialEditorState,
  token: null,
  lists: {
    genres: [],
  },
  userSettings: { nightMode: false, fontSize: 1, fontType: SERIF },
};
