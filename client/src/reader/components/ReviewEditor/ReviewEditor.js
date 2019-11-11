import React, { useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import {
  Button,
  BUTTON_VARIANTS,
  Inline,
  Input,
  Stack,
  StarRating,
  Box,
  TextArea,
} from '../../../shared/components';
import styles from './ReviewEditor.module.css';

const ReviewEditor = ({ submitHandler, ...props }) => {
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState('');
  const [review, setReview] = useState('');
  const [reviewId, setReviewId] = useState(null);

  useEffect(() => {
    if (props.review) {
      setRating(props.review.rating);
      setHeadline(props.review.headline);
      setReview(props.review.reviewBody);
      setReviewId(props.review.id);
    } else {
      resetReviewDataToDefault();
    }
  }, [props.review, setRating, setHeadline, setReview, setReviewId]);

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

  function handleReviewDeleteClick(e) {
    e.preventDefault();
    props.deleteHandler(resetReviewDataToDefault);
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
          rating,
          headline,
          reviewBody: review,
        };
        submitHandler(newReview, resetReviewDataToDefault);
      } else {
        const updatedReview = {
          id: reviewId,
          rating,
          headline,
          reviewBody: review,
        };
        submitHandler(updatedReview, resetReviewDataToDefault);
      }
    }
  }

  return (
    <Box>
      <form className={styles.container} onSubmit={handleSubmit}>
        <Stack align="justified">
          <label htmlFor="star-rating">Overall rating</label>
          <StarRating
            id="star-rating"
            rating={rating}
            onStarClick={handleStarClick}
            isEditable={true}
            className={styles.starRating}
          />
          <label htmlFor="headline">Add a headline</label>
          <Input
            id="headline"
            value={headline}
            onChange={handleHeadlineChange}
            className={styles.input}
            required
          />
          <label htmlFor="review">Write your review</label>
          <TextArea
            id="review"
            rows={6}
            className={styles.textArea}
            value={review}
            onChange={handleReviewChange}
            className={styles.input}
            required
          />
          <Inline align="right">
            <Button variant={BUTTON_VARIANTS.ACTION} type="submit">
              Submit
            </Button>
            {props.deleteHandler && (
              <Button
                id="delete-review"
                onClick={handleReviewDeleteClick}
                variant={BUTTON_VARIANTS.DESTRUCTIVE}
              >
                Delete Review
              </Button>
            )}
          </Inline>
        </Stack>
      </form>
    </Box>
  );
};

export default ReviewEditor;
