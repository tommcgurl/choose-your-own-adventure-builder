import React, { useEffect, useState } from 'react';
import AdventureService from '../../services/AdventureService';
import AdventureList from '../AdventureList';
import styles from './AdventureBrowser.module.css';

const AdventureBrowser = props => {
  const [adventures, setAdventures] = useState([]);
  const [endCursor, setEndCursor] = useState('');
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    loadMostRecentAdventures(50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const offset = 30;

    function handleScroll() {
      if (
        !fetching &&
        hasNextPage &&
        window.innerHeight + document.documentElement.scrollTop + offset >=
          document.documentElement.offsetHeight
      ) {
        loadMostRecentAdventures(50, endCursor);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function loadMostRecentAdventures(first, publishedBefore) {
    setFetching(true);
    AdventureService.getAdventures(first, publishedBefore).then(
      paginatedAdventures => {
        setAdventures([...adventures, ...paginatedAdventures.adventures]);
        setEndCursor(paginatedAdventures.pageInfo.endCursor);
        setHasNextPage(paginatedAdventures.pageInfo.hasNextPage);
        setFetching(false);
      }
    );
  }

  return (
    <div className={styles.container}>
      <AdventureList adventures={adventures} />
      {fetching && <div>Loading...</div>}
    </div>
  );
};

export default AdventureBrowser;
