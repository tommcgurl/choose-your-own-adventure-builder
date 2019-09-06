import React, { useState } from 'react';
import styles from './ReviewEditor.module.css';
import {
  Wysiwyg,
  StarRating,
  Button,
  BUTTON_VARIANTS,
} from '../../../shared/components';

const ReviewEditor = props => {
  const [rating, setRating] = useState(0);
  return (
    <form className={styles.container}>
      <StarRating rating={rating} onStarClick={setRating} isEditable={true} />
      <input />
      <Wysiwyg hideToolbar={true} />
      <Button variant={BUTTON_VARIANTS.ACTION} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ReviewEditor;
