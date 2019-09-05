import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import StarRating from './StarRating';

storiesOf('Components|StarRating', module)
  .addParameters({ component: StarRating })
  .add('read-only', () => <StarRating rating={2.5} />)
  .add('editable', () => {
    const [rating, setRating] = useState(2.5);

    function handleStarClick(starPosition) {
      setRating(starPosition);
    }

    return (
      <StarRating
        rating={rating}
        isEditable={true}
        onStarClick={handleStarClick}
      />
    );
  });
