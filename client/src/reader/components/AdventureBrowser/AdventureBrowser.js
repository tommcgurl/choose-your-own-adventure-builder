import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Inline } from '../../../shared/components';
import { genresSelector } from '../../../shared/store/selectors';
import adventureService from '../../services/readerAdventureService';
import AdventureList from '../AdventureList';
import BrowsingLayout from '../BrowsingLayout';

const AdventureBrowser = ({ genres }) => {
  const [adventures, setAdventures] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: true,
    endCursor: null,
    searchString: '',
    genres: [...genres],
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

  function handleSearchSubmit(e) {
    e.preventDefault();

    const searchString = e.target.elements.namedItem('searchString').value;

    const checkedGenreIds = Array.from(
      e.target.elements.namedItem('genre').values()
    )
      .filter(input => input.checked)
      .map(input => input.value);
    const searchGenres = genres.filter(
      genre => checkedGenreIds.indexOf(genre.id.toString()) > -1
    );

    setFetching(true);
    adventureService
      .getAdventures(100, null, searchString, searchGenres)
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
      <form id="adventure-search" onSubmit={handleSearchSubmit}>
        <input name="searchString" />
        <button type="submit">SEARCH</button>
        <Inline>
          {genres.map(genre => (
            <span key={genre.id}>
              <input
                id={`genre-input-${genre.id}`}
                name="genre"
                type="checkbox"
                value={genre.id}
                defaultChecked={true}
              />
              <label htmlFor={`genre-input-${genre.id}`}>{genre.name}</label>
            </span>
          ))}
        </Inline>
      </form>
      <AdventureList adventures={adventures} />
      {fetching ? <div>Loading...</div> : !adventures.length && 'Nada, bud.'}
    </BrowsingLayout>
  );
};

const mapStateToProps = state => {
  return {
    genres: genresSelector(state),
  };
};

export default connect(mapStateToProps)(AdventureBrowser);
