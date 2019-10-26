import React, { useEffect, useState } from 'react';
import reviewService from '../../services/editorReviewService';

const PublishedAdventure = ({ match }) => {
  const adventureId = match.params.adventureId;
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const reviewGetter = async () => {
      const fetchedReviews = await reviewService.fetchAdventureReviews(
        adventureId
      );
      setReviews(fetchedReviews);
    };
    reviewGetter();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Reviews for this adventure</h1>
      <ul>
        {reviews.map((r, i) => {
          return (
            <li key={i}>
              <strong>Rating: </strong>
              <p>{r.rating}</p>
              <strong>Headline: </strong>
              <p>{r.headline}</p>
              <strong>Review: </strong>
              <p>{r.reviewBody}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PublishedAdventure;
