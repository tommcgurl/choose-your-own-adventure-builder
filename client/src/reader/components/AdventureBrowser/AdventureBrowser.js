import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Input, Dropdown, Stack } from '../../../shared/components';
import { genresSelector } from '../../../shared/store/selectors';
import adventureService from '../../services/readerAdventureService';
import AdventureList from '../AdventureList';
import BrowsingLayout from '../BrowsingLayout';
import styles from './AdventureBrowser.module.css';

const AdventureBrowser = ({ genres }) => {
  const [adventures, setAdventures] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: true,
    endCursor: null,
    searchString: '',
    genres: [],
  });
  const [fetching, setFetching] = useState(false);

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
          .getAdventures(
            take,
            pageInfo.endCursor,
            pageInfo.searchString,
            pageInfo.genres
          )
          .then(paginatedAdventures => {
            setAdventures([...adventures, ...paginatedAdventures.adventures]);
            setPageInfo({ ...paginatedAdventures.pageInfo });
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

  function handleSearchStringChange(e) {
    const { value: searchString } = e.target;
    setPageInfo(state => ({ ...state, searchString }));
  }

  function handleGenreSelect(e) {
    const searchGenre = genres.find(genre => genre.id == e.target.value);
    const searchGenres = searchGenre ? [searchGenre] : [];
    setPageInfo(state => ({
      ...state,
      genres: searchGenres,
    }));
    executeSearch(searchGenres);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    executeSearch();
  }

  function executeSearch(searchGenres) {
    setFetching(true);
    adventureService
      .getAdventures(
        100,
        null,
        pageInfo.searchString,
        searchGenres || pageInfo.genres
      )
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
      <Box>
        <form id="adventure-search" onSubmit={handleSearchSubmit}>
          <Stack align="justified">
            <Input
              name="searchString"
              placeholder="Search"
              className={styles.searchInput}
              value={pageInfo.searchString}
              onChange={handleSearchStringChange}
            />
            <Dropdown
              className={styles.searchInput}
              onChange={handleGenreSelect}
              value={pageInfo.genres.length && pageInfo.genres[0].id}
            >
              <option>All</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Dropdown>
          </Stack>
        </form>
      </Box>
      <AdventureList adventures={adventures} />
      {fetching ? (
        <Box>Loading...</Box>
      ) : (
        !adventures.length && <Box>Nada, bud.</Box>
      )}
    </BrowsingLayout>
  );
};

const mapStateToProps = state => {
  return {
    genres: genresSelector(state),
  };
};

export default connect(mapStateToProps)(AdventureBrowser);
