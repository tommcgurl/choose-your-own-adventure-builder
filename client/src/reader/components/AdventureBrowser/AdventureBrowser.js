import React, { useEffect, useState } from 'react';
import AdventureService from '../../services/AdventureService';
import AdventureList from '../AdventureList';
import Nav from '../Nav';

const AdventureBrowser = () => {
  const [adventures, setAdventures] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    function conditionallyFetchAdventures(
      isFetching,
      isMoreToFetch,
      publishedBefore,
      first
    ) {
      if (
        !isFetching &&
        isMoreToFetch &&
        window.innerHeight + document.documentElement.scrollTop + 400 >=
          document.documentElement.offsetHeight
      ) {
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
    }

    // This will ensure the page continues to fill up with adventures on load
    conditionallyFetchAdventures(fetching, hasNextPage, endCursor, 100);

    function handleScroll() {
      conditionallyFetchAdventures(fetching, hasNextPage, endCursor, 50);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [fetching, hasNextPage, endCursor, adventures]);

  return (
    <>
      <Nav />
      <AdventureList adventures={adventures} />
      {fetching && <div>Loading...</div>}
    </>
  );
};

export default AdventureBrowser;
