import React from 'react';

import styles from './AdventureList.module.css';

import AdventureListItem from '../AdventureListItem';

const AdventureList = ({ adventures }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {adventures.map(adventure => (
          <AdventureListItem key={adventure.id} adventure={adventure} />
        ))}
      </ul>
    </div>
  );
};

export default AdventureList;
