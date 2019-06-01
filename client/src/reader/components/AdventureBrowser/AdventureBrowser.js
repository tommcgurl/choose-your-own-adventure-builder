import React, { useEffect, useState } from 'react';
import AdventureService from '../../services/AdventureService';
import AdventureList from '../AdventureList';

const AdventureBrowser = props => {
  const [adventures, setAdventures] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    function loadMostRecentAdventures() {
      setFetching(true);
      AdventureService.getAdventures(50).then(data => {
        setAdventures(data);
        setFetching(false);
      });
    }

    loadMostRecentAdventures();
  }, []);

  useEffect(() => {
    const offset = 30;

    function conditionallyFetch() {
      if (
        window.innerHeight + document.documentElement.scrollTop + offset >=
        document.documentElement.offsetHeight
      ) {
        if (!fetching && adventures.length > 0) {
          setFetching(true);

          const minDate = Math.min(
            ...adventures.map(a => new Date(a.published))
          );

          AdventureService.getAdventures(10, new Date(minDate)).then(data => {
            setAdventures([...adventures, ...data]);
            setFetching(false);
          });
        }
      }
    }

    conditionallyFetch();

    function handleScroll() {
      conditionallyFetch();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetching]);

  return <AdventureList adventures={adventures} />;
};

export default AdventureBrowser;
