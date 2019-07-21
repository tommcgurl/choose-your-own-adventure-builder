import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAdventure, fetchProgress } from '../store/actions/libraryActions';
import { adventureSelector } from '../store/selectors';

const AdventureProvider = ({
  children,
  adventure,
  fetchAdventure,
  match,
  fetchProgress,
  ...rest
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

  return children({ ...adventure, ...rest });
};

const mapStateToProps = (state, { match }) => {
  return {
    adventure: adventureSelector(state)(match.params.adventureId),
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
