import React, { useEffect, useRef, useState } from 'react';
import adventureService from '../../services/readerAdventureService';
import AdventureList from '../AdventureList';
import BrowsingLayout from '../BrowsingLayout';

const AdventureBrowser = () => {
  const [adventures, setAdventures] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: true,
    endCursor: null,
    searchString: '',
  });
  const [fetching, setFetching] = useState(false);

  const searchStringElRef = useRef(null);

  useEffect(() => {
    function conditionallyFetchAdventures(take) {
      if (
        !fetching &&
        pageInfo.hasNextPage &&
        window.innerHeight + document.documentElement.scrollTop + 400 >=
          document.documentElement.offsetHeight
      ) {
        setFetching(true);
        adventureService
          .getAdventures(take, pageInfo.endCursor, pageInfo.searchString)
          .then(paginatedAdventures => {
            setAdventures([...adventures, ...paginatedAdventures.adventures]);
            setPageInfo({
              endCursor: paginatedAdventures.pageInfo.endCursor,
              hasNextPage: paginatedAdventures.pageInfo.hasNextPage,
              searchString: paginatedAdventures.pageInfo.searchString,
            });
            setFetching(false);
          })
          .catch(() => {
            setFetching(false);
          });
      }
    }

    // This will ensure the page continues to fill up with adventures on load
    conditionallyFetchAdventures(100);

    function handleScroll() {
      conditionallyFetchAdventures(50);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [fetching, pageInfo, adventures]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setFetching(true);
    adventureService
      .getAdventures(100, null, searchStringElRef.current.value)
      .then(paginatedAdventures => {
        setAdventures([...paginatedAdventures.adventures]);
        setPageInfo({ ...paginatedAdventures.pageInfo });
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  }

  return (
    <BrowsingLayout>
      <form onSubmit={handleSearchSubmit}>
        <input ref={searchStringElRef} />
        <button type="submit">SEARCH</button>
      </form>
      <AdventureList adventures={adventures} />
      {fetching ? <div>Loading...</div> : !adventures.length && 'Nada, bud.'}
    </BrowsingLayout>
  );
};

export default AdventureBrowser;
