import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button, { VARIANTS } from '../../../shared/components/Button';
import * as routes from '../../constants/routes';
import { addBreadcrumb, addToLibrary, removeBreadcrumb } from '../../store/actions/libraryActions';
import { adventureSelector, currentBreadcrumbSelector } from '../../store/selectors';
import progressSelector from '../../store/selectors/progressSelector';
import Options from '../Options';

function createBreadcrumb(currentBreadcrumb, consequences) {
  if (consequences.length === 1 && consequences[0].nextBranch) {
    return {
      ...currentBreadcrumb,
      storyPartKey: consequences[0].nextBranch,
    };
  }
  throw new Error('Not implemented');
}

const Read = ({
  adventure,
  breadcrumb: currentBreadcrumb,
  match,
  addBreadcrumb,
  goBack,
  startOver,
  progress,
}) => {
  function onChoiceClick(consequence) {
    const breadcrumb = createBreadcrumb(currentBreadcrumb, [consequence]);
    if (adventure.mainStory.storyParts[breadcrumb.storyPartKey]) {
      addBreadcrumb(adventure.id, breadcrumb);
    } else {
      throw new Error(
        `Tried to travel to nonexistant story part: ${breadcrumb.storyPartKey}`
      );
    }
  }

  function onGoBackClick() {
    goBack(adventure.id);
  }

  function onStartOverClick() {
    startOver(adventure);
  }

  return adventure && currentBreadcrumb && Array.isArray(progress) ? (
    <div>
      <Options />
      <div
        dangerouslySetInnerHTML={{
          __html:
            adventure.mainStory.storyParts[currentBreadcrumb.storyPartKey].plot,
        }}
      />
      {adventure.mainStory.storyParts[currentBreadcrumb.storyPartKey]
        .prompt && (
          <div>
            <p>
              {
                adventure.mainStory.storyParts[currentBreadcrumb.storyPartKey]
                  .prompt.text
              }
            </p>
            <ul>
              {adventure.mainStory.storyParts[
                currentBreadcrumb.storyPartKey
              ].prompt.choices.map(choice => (
                <li key={choice.text}>
                  <Button onClick={() => onChoiceClick(choice.consequence)}>
                    {choice.text}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      {progress.length > 1 && (
        <div>
          <Button onClick={onGoBackClick}>Go back</Button>
          <Button variant={VARIANTS.DESTRUCTIVE} onClick={onStartOverClick}>Start Over</Button>
        </div>
      )}
    </div>
  ) : match && match.params && match.params.adventureId ? (
    <Redirect
      to={routes.COVER.replace(':adventureId', match.params.adventureId)}
    />
  ) : (
        <Redirect to={routes.NOT_FOUND} />
      );
};

const mapStateToProps = (state, { match }) => {
  return (
    match &&
    match.params &&
    match.params.adventureId && {
      adventure: adventureSelector(state)(match.params.adventureId),
      breadcrumb: currentBreadcrumbSelector(state)(match.params.adventureId),
      progress: progressSelector(state)(match.params.adventureId),
    }
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addBreadcrumb: (id, breadcumb) => {
      dispatch(addBreadcrumb(id, breadcumb));
    },
    goBack: id => {
      dispatch(removeBreadcrumb(id));
    },
    startOver: adventure => {
      dispatch(addToLibrary(adventure));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Read);
