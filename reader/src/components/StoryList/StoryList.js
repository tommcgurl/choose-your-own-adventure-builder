import React, { useEffect } from 'react';

import styles from './StoryList.module.css';
import StoryListItem from '../StoryListItem/StoryListItem';

const StoryList = ({ stories, fetchStories }) => {
  useEffect(() => {
    console.log('fetch!');
    fetchStories();
  }, []);
  // const stories = [
  //   {
  //     id: 1,
  //     title: 'title1',
  //     author: 'a1',
  //   },
  //   {
  //     id: 2,
  //     title: 'title2',
  //     author: 'a2',
  //   },
  //   {
  //     id: 3,
  //     title: 'title3',
  //     author: 'a3',
  //   },
  // ];
  return (
    <ul className={styles.list}>
      {stories.map(story => (
        <StoryListItem key={story.id} story={story} />
      ))}
    </ul>
  );
};

export default StoryList;
