import React from 'react';

const StoryListItem = ({ story }) => {
  return (
    <li>
      {story.title} by {story.author}
    </li>
  );
};

export default StoryListItem;
