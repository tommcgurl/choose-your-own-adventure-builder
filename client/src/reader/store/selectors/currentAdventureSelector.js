function currentAdventureSelector(state) {
  return id => state.reader.library[id] && state.reader.library[id].adventure;
}

export default currentAdventureSelector;
