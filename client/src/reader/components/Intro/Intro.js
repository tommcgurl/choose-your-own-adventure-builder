import React from 'react';
import Page from '../Page';
import styles from './Intro.module.css';

const Intro = ({ intro, title, onIntroComplete }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <Page html={intro} />
      <button onClick={onIntroComplete}>Let's Go!</button>
    </div>
  );
};

export default Intro;
