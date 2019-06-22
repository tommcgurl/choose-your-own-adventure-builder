import values from 'lodash.values';

function librarySelector(state) {
  return values(state.reader.library).map(l => l.adventure);
}

export default librarySelector;
