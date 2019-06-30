import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { currentAdventureSelector } from '../store/selectors';
import { fetchAdventure, fetchProgress } from '../store/actions/libraryActions';

const AdventureProvider = ({
  children,
  adventure,
  fetchAdventure,
  match,
  fetchProgress,
}) => {
  const [triedToFetch, setTriedToFetch] = useState(false);

  useEffect(() => {
    if (!adventure && !triedToFetch) {
      setTriedToFetch(true);
      fetchAdventure(match.params.adventureId);
    }
  }, [adventure, triedToFetch, fetchAdventure, match.params.adventureId]);

  useEffect(() => {
    if (adventure) {
      fetchProgress(adventure.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adventure) {
    return <div>Loading...</div>;
  }

  return children(adventure);
};

const mapStateToProps = (state, { match }) => {
  return {
    adventure: currentAdventureSelector(state)(match.params.adventureId),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAdventure: id => {
      dispatch(fetchAdventure(id));
    },
    fetchProgress: id => {
      dispatch(fetchProgress(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdventureProvider);
