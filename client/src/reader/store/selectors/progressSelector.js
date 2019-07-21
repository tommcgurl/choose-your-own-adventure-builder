function progressSelector(state) {
  return id => state.reader.library[id] && state.reader.library[id].progress;
}

export default progressSelector;
