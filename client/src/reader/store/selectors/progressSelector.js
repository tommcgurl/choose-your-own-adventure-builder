export default function(state) {
  return id => state.reader.library[id] && state.reader.library[id].progress;
}
