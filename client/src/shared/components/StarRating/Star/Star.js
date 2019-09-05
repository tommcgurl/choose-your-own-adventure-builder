import React from 'react';
import styles from './Star.module.css';
import { IoMdStarHalf, IoMdStarOutline, IoMdStar } from 'react-icons/io';
import classNames from 'classnames';

const Star = ({
  starPosition,
  rating,
  hoverRating,
  onPointerEnter,
  isEditable,
  onClick,
}) => {
  function handlePointerEnter() {
    if (isEditable) {
      onPointerEnter();
    }
  }

  const starClassName = classNames({
    [styles.editableStar]: isEditable,
  });

  return (
    <span
      onPointerEnter={handlePointerEnter}
      className={starClassName}
      onClick={onClick}
    >
      {hoverRating >= starPosition ? (
        <IoMdStar />
      ) : hoverRating > 0 ? (
        <IoMdStarOutline />
      ) : rating >= starPosition ? (
        <IoMdStar />
      ) : Math.round(2 * ((rating - starPosition + 1) % 1)) >= 1 ? (
        <IoMdStarHalf />
      ) : (
        <IoMdStarOutline />
      )}
    </span>
  );
};

export default Star;
