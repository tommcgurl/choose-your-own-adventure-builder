import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Dropdown, Input, Stack } from '../../../shared/components';
import { genresSelector } from '../../../shared/store/selectors';
import adventureService from '../../services/readerAdventureService';
import AdventureList from '../AdventureList';
import BrowsingLayout from '../BrowsingLayout';
import styles from './AdventureBrowser.module.css';

const AdventureBrowser = ({ genres }) => {
  const [adventures, setAdventures] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [searchValues, setSearchValues] = useState({
    from: 0,
    size: 50,
    searchString: '',
    genres: [],
    sort: 'published:desc',
  });
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    function conditionallyFetchAdventures() {
      if (
        !fetching &&
        hasNextPage &&
        window.innerHeight + document.documentElement.scrollTop + 400 >=
          document.documentElement.offsetHeight
      ) {
        setFetching(true);
        adventureService
          .getAdventures(searchValues)
          .then(paginatedAdventures => {
            setAdventures(state => [
              ...state,
              ...paginatedAdventures.adventures,
            ]);
            setSearchValues(state => ({
              ...state,
              from: state.from + paginatedAdventures.adventures.length,
            }));
            setHasNextPage(paginatedAdventures.pageInfo.hasNextPage);
          })
          .catch(() => {
            setHasNextPage(false);
          })
          .finally(() => {
            setFetching(false);
          });
      }
    }

    // This will ensure the page continues to fill up with adventures on load
    conditionallyFetchAdventures();

    function handleScroll() {
      conditionallyFetchAdventures();
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [fetching, hasNextPage, searchValues]);

  function handleSearchStringChange(e) {
    const { value: searchString } = e.target;
    setSearchValues(state => ({ ...state, searchString }));
  }

  function handleGenreSelect(e) {
    const searchGenre = genres.find(
      genre => genre.id.toString() === e.target.value
    );
    const searchGenres = searchGenre ? [searchGenre] : [];
    setSearchValues(state => ({
      ...state,
      genres: searchGenres,
    }));
    executeSearch(searchGenres);
  }

  function handleSortSelect(e) {
    const sort = e.target.value;
    setSearchValues(state => ({
      ...state,
      sort,
    }));
    executeSearch(null, sort);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    executeSearch();
  }

  function executeSearch(searchGenres, sort) {
    setFetching(true);
    adventureService
      .getAdventures({
        ...searchValues,
        from: 0,
        genres: searchGenres || searchValues.genres,
        sort: sort || searchValues.sort,
      })
      .then(paginatedAdventures => {
        setAdventures([...paginatedAdventures.adventures]);
        setSearchValues(state => ({
          ...state,
          from: paginatedAdventures.adventures.length,
        }));
        setHasNextPage(paginatedAdventures.pageInfo.hasNextPage);
      })
      .finally(() => {
        setFetching(false);
      });
  }

  return (
    <BrowsingLayout>
      <Box>
        <form id="adventure-search" onSubmit={handleSearchSubmit}>
          <Stack>
            <Input
              name="searchString"
              placeholder="Search"
              className={styles.searchInput}
              value={searchValues.searchString}
              onChange={handleSearchStringChange}
            />
            <Dropdown
              className={styles.searchInput}
              onChange={handleGenreSelect}
              value={searchValues.genres.length && searchValues.genres[0].id}
            >
              <option>All</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              className={styles.searchInput}
              value={searchValues.sort}
              onChange={handleSortSelect}
            >
              <option value="published:desc">Newest</option>
              <option value="popularity:desc">Most Popular</option>
              <option value="rating:desc">Highest Rating</option>
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
