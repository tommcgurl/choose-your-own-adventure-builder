import React from 'react';
import styles from './Intro.module.css';

const Intro = ({ intro, title, onIntroComplete }) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: intro }} />
      <button onClick={onIntroComplete}>Let's Go!</button>
    </div>
  );
};

export default Intro;
