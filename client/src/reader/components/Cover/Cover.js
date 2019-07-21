import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import { getAdventure } from '../../services/adventureService';
import { startAdventure } from '../../store/actions/libraryActions';
import { adventureSelector, progressSelector } from '../../store/selectors';
import BrowsingLayout from '../BrowsingLayout';

const Cover = ({
  adventure: adventureFromState,
  progress: progressFromState,
  embark,
  history,
  match,
}) => {
  const [adventure, setAdventure] = useState(adventureFromState);
  useEffect(() => {
    if (!adventure) {
      if (match && match.params && match.params.adventureId) {
        getAdventure(match.params.adventureId)
          .then(adventure => {
            if (adventure) {
              setAdventure(adventure);
            } else {
              bail();
            }
          })
          .catch(() => bail());
      } else {
        bail();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function bail() {
    history.replace(routes.NOT_FOUND);
  }

  const { id, title, intro } = adventure || {};

  function onStartAdventureClick() {
    embark(id);
    history.push(routes.READ.replace(':adventureId', id));
  }

  function onContinueClick() {
    history.push(routes.READ.replace(':adventureId', id));
  }

  return (
    <BrowsingLayout>
      {adventure ? (
        <div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: intro }} />
          <div>
            <button onClick={onStartAdventureClick}>
              {Array.isArray(progressFromState) && progressFromState.length
                ? 'Start Over'
                : 'Embark'}
            </button>
            {Array.isArray(progressFromState) && progressFromState.length && (
              <button onClick={onContinueClick}>Continue</button>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BrowsingLayout>
  );
};

const mapStateToProps = (state, { match }) => {
  return (
    match &&
    match.params &&
    match.params.adventureId && {
      adventure: adventureSelector(state)(match.params.adventureId),
      progress: progressSelector(state)(match.params.adventureId),
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    embark: id => {
      dispatch(startAdventure(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cover);
