import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Star from './Star';

const StarRating = ({ rating, isEditable, onStarClick, ...rest }) => {
  const [hoverRating, setHoverRating] = useState(0);

  function handleStarHovered(position) {
    setHoverRating(position);
  }

  function handlePointerLeave() {
    setHoverRating(0);
  }

  function handleStarClick(pos) {
    const position = rating === pos ? 0 : pos;
    onStarClick(position);
  }

  return (
    <span onPointerLeave={handlePointerLeave} {...rest}>
      {[1, 2, 3, 4, 5].map(starPosition => (
        <Star
          key={starPosition}
          starPosition={starPosition}
          rating={rating}
          hoverRating={hoverRating}
          onPointerEnter={handleStarHovered.bind(null, starPosition)}
          isEditable={isEditable}
          onClick={handleStarClick.bind(null, starPosition)}
        />
      ))}
    </span>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  isEditable: PropTypes.bool,
  onStarClick: PropTypes.func,
};

StarRating.defaultProps = {
  isEditable: false,
  onStarClick: () => {},
};

export default StarRating;
