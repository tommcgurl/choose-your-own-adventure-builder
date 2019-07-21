function adventureSelector(state) {
  return id => state.reader.library[id] && state.reader.library[id].adventure;
}

export default adventureSelector;
