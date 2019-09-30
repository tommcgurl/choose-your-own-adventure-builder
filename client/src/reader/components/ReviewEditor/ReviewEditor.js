import React, { useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import {
  Button,
  BUTTON_VARIANTS,
  StarRating,
} from '../../../shared/components';
import styles from './ReviewEditor.module.css';

const ReviewEditor = ({ submitHandler, adventureId, ...props }) => {
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [review, setReview] = useState('');
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    if (props.rating && props.headline && props.reviewBody && props.reviewId) {
      setRating(props.rating);
      setHeadline(props.headline);
      setReview(props.reviewBody);
      setReviewId(props.reviewId);
    } else {
      resetReviewDataToDefault();
    }
  }, [
    props.rating,
    props.headline,
    props.reviewBody,
    props.reviewId,
    setRating,
    setHeadline,
    setReview,
    setReviewId,
  ]);

  function handleStarClick(pos) {
    setRating(pos);
  }

  function handleHeadlineChange(e) {
    const { value } = e.target;
    setHeadline(value);
  }

  function handleReviewChange(e) {
    const { value } = e.target;
    setReview(value);
  }

  function resetReviewDataToDefault() {
    setRating(0);
    setHeadline('');
    setReview('');
    setReviewId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const valid =
      rating > 0 &&
      Array.from(e.target.elements).every(el => el.validity.valid);
    if (valid) {
      if (reviewId === null) {
        const newReview = {
          id: uuid(),
          adventureId,
          rating,
          headline,
          reviewBody: review,
        };
        submitHandler(newReview, resetReviewDataToDefault);
      } else {
        const updatedReview = {
          id: reviewId,
          adventureId,
          rating,
          headline,
          reviewBody: review,
        };
        submitHandler(updatedReview, resetReviewDataToDefault);
      }
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="star-rating">Overall rating</label>
      <StarRating
        id="star-rating"
        rating={rating}
        onStarClick={handleStarClick}
        isEditable={true}
        className={styles.starRating}
      />
      <label htmlFor="headline">Add a headline</label>
      <input
        id="headline"
        value={headline}
        onChange={handleHeadlineChange}
        required
      />
      <label htmlFor="review">Write your review</label>
      <textarea
        id="review"
        rows={6}
        className={styles.textArea}
        value={review}
        onChange={handleReviewChange}
        required
      />
      <div className={styles.submitButtonContainer}>
        <Button variant={BUTTON_VARIANTS.ACTION} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReviewEditor;
