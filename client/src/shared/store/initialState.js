import initialEditorState from '../../editor/store/initialState';
import initialReaderState from '../../reader/store/initialState';

export default {
  reader: initialReaderState,
  editor: initialEditorState,
  token: null,
  lists: {
    genres: [],
  },
};
