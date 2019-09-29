import values from 'lodash.values';

function reviewsSelector(state) {
  return values(state.reader.reviews);
}

export default reviewsSelector;
