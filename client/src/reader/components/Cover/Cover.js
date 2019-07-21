import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import authService from '../../../shared/services/authService';
import { tokenSelector } from '../../../shared/store/selectors/index';
import * as routes from '../../constants/routes';
import adventureService from '../../services/readerAdventureService';
import { addToLibrary } from '../../store/actions/libraryActions';
import { adventureSelector, progressSelector } from '../../store/selectors';
import BrowsingLayout from '../BrowsingLayout';

const Cover = ({
  adventure: adventureFromState,
  progress: progressFromState,
  embark,
  history,
  match,
  token,
}) => {
  const [adventure, setAdventure] = useState(adventureFromState);
  useEffect(() => {
    if (!adventure) {
      if (match && match.params && match.params.adventureId) {
        adventureService
          .getAdventure(match.params.adventureId)
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
    embark(adventure);
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
            <button
              onClick={onStartAdventureClick}
              disabled={!authService.isAuthenticated(token)}
            >
              {authService.isAuthenticated(token)
                ? Array.isArray(progressFromState) && progressFromState.length
                  ? 'Start Over'
                  : 'Embark'
                : 'Login to Embark'}
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
  let props = {
    token: tokenSelector(state),
  };
  if (match && match.params && match.params.adventureId) {
    props = {
      ...props,
      adventure: adventureSelector(state)(match.params.adventureId),
      progress: progressSelector(state)(match.params.adventureId),
    };
  }
  return props;
};

const mapDispatchToProps = dispatch => {
  return {
    embark: adventure => {
      dispatch(addToLibrary(adventure));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cover);