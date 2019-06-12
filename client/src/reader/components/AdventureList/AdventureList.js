import React from 'react';
import AdventureListItem from '../AdventureListItem';
import styles from './AdventureList.module.css';

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
