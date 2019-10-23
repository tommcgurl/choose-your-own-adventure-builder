import values from 'lodash.values';

function reviewsSelector(state) {
  return id =>
    state.reader.library[id] &&
    values(state.reader.reviews).find(r => r.adventureId === id);
}

export default reviewsSelector;
