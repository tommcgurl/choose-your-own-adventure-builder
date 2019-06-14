import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import emptyOrSpecialCharacters from '../../../shared/validators/emptyOrSpecialCharacters';
import * as routes from '../../constants/routes';
import draftService from '../../services/draftService';
import {
  addCoverImage,
  addStoryPart,
  changeGenre,
  deleteDraft,
  publishAdventure,
} from '../../store/actions/draftActions';
import { draftSelector, genresSelector } from '../../store/selectors';
import * as styles from './Draft.module.css';

const Draft = ({
  addStoryPart,
  deleteDraft,
  getDraft,
  match,
  genres,
  changeGenre,
  publishAdventure,
  addCoverImage,
}) => {
  const [newStoryPartKey, setNewStoryPartKey] = useState('');
  const [publishErrors, setPublishErrors] = useState([]);
  const [imageUrlValue, setImageUrlValue] = useState('');

  const draft = getDraft(match.params.draftId);
  if (!draft) {
    return <Redirect to={routes.DRAFTS} />;
  }
  function handleAddStoryPartClick() {
    if (storyKeyInputIsValid()) {
      addStoryPart(newStoryPartKey, draft.id);
      setNewStoryPartKey('');
    }
  }

  function storyKeyInputIsValid() {
    return (
      !emptyOrSpecialCharacters(newStoryPartKey) &&
      Object.keys(draft.mainStory.storyParts).indexOf(newStoryPartKey) < 0 &&
      newStoryPartKey !== 'intro'
    );
  }

  function handleDeleteDraft() {
    const confirmed = window.confirm('You sure, dog?');
    if (confirmed) {
      deleteDraft(draft.id);
    }
  }

  function handleGenreChange(event) {
    const genreId = parseInt(event.target.value);
    const genre = isNaN(genreId) ? null : genres.find(g => g.id === genreId);
    changeGenre(draft.id, genre);
  }

  function handlePublishClick() {
    setPublishErrors([]);
    const errors = draftService.validateDraftReadyToPublish(draft);

    if (errors.length === 0) {
      publishAdventure(draft.id);
    } else {
      setPublishErrors(errors);
    }
  }

  function handleImageUrlChange(e) {
    setImageUrlValue(e.target.value);
  }

  function handleImageUrlSubmit(e) {
    e.preventDefault();
    addCoverImage(draft.id, imageUrlValue);
  }

  return (
    <div>
      <div>Title: {draft.title}</div>
      <Link
        to={routes.EDIT.replace(':draftId', draft.id).replace(
          ':storyPartKey',
          'intro'
        )}
      >
        Intro
      </Link>
      <div>
        Parts:
        <ul>
          {Object.keys(draft.mainStory.storyParts).map(key => (
            <li key={key}>
              <Link
                to={routes.EDIT.replace(':draftId', draft.id).replace(
                  ':storyPartKey',
                  encodeURIComponent(key)
                )}
              >
                {key}
              </Link>
            </li>
          ))}
          <li>
            <form>
              <input
                value={newStoryPartKey}
                onChange={e => setNewStoryPartKey(e.target.value)}
              />
              <input
                type="submit"
                disabled={!storyKeyInputIsValid()}
                onClick={handleAddStoryPartClick}
                value="Add Story Part"
              />
            </form>
          </li>
        </ul>
      </div>
      <div>
        <select
          value={(draft.genre && draft.genre.id) || ''}
          onChange={handleGenreChange}
        >
          <option value="">{'-- Select a genre --'}</option>
          {genres.map(g => {
            return (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <form onSubmit={handleImageUrlSubmit}>
          <label>
            {draft.coverImage
              ? 'Change cover image: '
              : 'Add link to a cover image: '}
            <input type="text" onChange={handleImageUrlChange} />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
      <div>
        <button onClick={handleDeleteDraft}>DELETE DRAFT</button>
      </div>
      <div>
        <div>
          <button onClick={handlePublishClick}>PUBLISH ADVENTURE</button>
        </div>
        <>
          {draft.coverImage ? (
            <div>
              <div>{`Your current cover image: ${draft.coverImage}`}</div>
              <div>
                <img
                  className={styles.coverImage}
                  src={draft.coverImage}
                  alt={`${draft.title}`}
                />
              </div>
            </div>
          ) : null}
        </>
        {publishErrors.length > 0 && (
          <div>
            <ul>
              {publishErrors.map(e => (
                <li key={e.message}>{e.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getDraft: id => draftSelector(state)(id),
    genres: genresSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStoryPart: (key, adventureId) => {
      dispatch(addStoryPart(key, adventureId));
    },
    deleteDraft: draftId => {
      dispatch(deleteDraft(draftId));
    },
    changeGenre: (draftId, genre) => {
      dispatch(changeGenre(draftId, genre));
    },
    publishAdventure: draftId => {
      dispatch(publishAdventure(draftId));
    },
    addCoverImage: (draftId, imageUrl) => {
      dispatch(addCoverImage(draftId, imageUrl));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draft);
