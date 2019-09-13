import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Star from './Star';

const StarRating = ({ rating, isEditable, onStarClick }) => {
  const [hoverRating, setHoverRating] = useState(0);

  function handleStarHovered(position) {
    setHoverRating(position);
  }

  function handlePointerLeave() {
    setHoverRating(0);
  }

  return (
    <div onPointerLeave={handlePointerLeave}>
      {[1, 2, 3, 4, 5].map(starPosition => (
        <Star
          key={starPosition}
          starPosition={starPosition}
          rating={rating}
          hoverRating={hoverRating}
          onPointerEnter={handleStarHovered.bind(null, starPosition)}
          isEditable={isEditable}
          onClick={onStarClick.bind(null, starPosition)}
        />
      ))}
    </div>
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
