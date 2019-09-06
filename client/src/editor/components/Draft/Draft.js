import React, { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import uuid from 'uuid/v4';
import { BUTTON_VARIANTS } from '../../../shared/components';
import Button, { VARIANTS } from '../../../shared/components/Button';
import { genresSelector } from '../../../shared/store/selectors';
import isImageUrlValid from '../../../shared/validators/isImageUrlValid';
import * as routes from '../../constants/routes';
import draftService from '../../services/draftService';
import {
  addStoryPart,
  changeGenre,
  deleteDraft,
  deleteStoryPart,
  publishAdventure,
  setCoverImage,
} from '../../store/actions/draftActions';
import { draftSelector } from '../../store/selectors';
import { storyNameIsValid } from '../../validators';
import * as styles from './Draft.module.css';

const Draft = ({
  addStoryPart,
  deleteStoryPart,
  deleteDraft,
  getDraft,
  match,
  genres,
  changeGenre,
  publishAdventure,
  setCoverImage,
}) => {
  const [newStoryPartName, setNewStoryPartName] = useState('');
  const [publishErrors, setPublishErrors] = useState([]);
  const [imageUrlValue, setImageUrlValue] = useState('');
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(true);

  const draft = getDraft(match.params.draftId);
  if (!draft) {
    return <Redirect to={routes.DRAFTS} />;
  }
  function handleAddStoryPartClick() {
    if (newStoryNameIsValid()) {
      const newStoryPartId = uuid();
      addStoryPart(newStoryPartId, newStoryPartName, draft.id);
      setNewStoryPartName('');
    }
  }

  function handleDeleteStoryPart(key) {
    if (window.confirm('Delete this story part?')) {
      deleteStoryPart(key, draft.id);
    }
  }

  function newStoryNameIsValid() {
    return storyNameIsValid(newStoryPartName, draft.storyParts);
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
    if (isImageUrlValid(imageUrlValue)) {
      setCoverImage(draft.id, imageUrlValue);
      setImageUrlValue('');
    }
  }

  function handleCoverImageDelete() {
    setCoverImage(draft.id, null);
  }

  return (
    <div>
      <div>Title: {draft.title}</div>
      <Link
        to={routes.EDIT.replace(':draftId', draft.id).replace(
          ':storyPartKey',
          'blurb'
        )}
      >
        Blurb
      </Link>
      <div>
        Parts:
        <ul>
          {Object.keys(draft.storyParts).map(key => (
            <li key={key}>
              <Link
                to={routes.EDIT.replace(':draftId', draft.id).replace(
                  ':storyPartKey',
                  encodeURIComponent(key)
                )}
              >
                {draft.storyParts[key].name}
              </Link>
              <Button
                variant={BUTTON_VARIANTS.ICON}
                onClick={() => handleDeleteStoryPart(key)}
              >
                <IoMdTrash />
              </Button>
            </li>
          ))}
          <li>
            <form>
              <input
                value={newStoryPartName}
                onChange={e => setNewStoryPartName(e.target.value)}
              />
              <input
                type="submit"
                disabled={!newStoryNameIsValid()}
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
      <Button
        onClick={() => {
          setIsDescriptionVisible(!isDescriptionVisible);
        }}
      >
        {isDescriptionVisible
          ? 'Hide Genre Description'
          : 'Show Genre Description'}
      </Button>
      {isDescriptionVisible && (
        <div className={styles.genreDescription}>
          <p>
            <strong>This genre's description:</strong>
          </p>
          <p>{draft.genre && draft.genre.description}</p>
        </div>
      )}
      <div>
        <form onSubmit={handleImageUrlSubmit}>
          <label>
            {draft.coverImage
              ? 'Change cover image: '
              : 'Add link to a cover image: '}
            <input
              type="text"
              onChange={handleImageUrlChange}
              value={imageUrlValue}
            />
            <input
              type="submit"
              value="Submit"
              disabled={!isImageUrlValid(imageUrlValue)}
            />
          </label>
        </form>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant={VARIANTS.DESTRUCTIVE} onClick={handleDeleteDraft}>
          Delete Draft
        </Button>
        <Button variant={VARIANTS.ACTION} onClick={handlePublishClick}>
          Publish Adventure
        </Button>
        {draft.coverImage && (
          <React.Fragment>
            <div>{`Your current cover image: ${draft.coverImage}`}</div>
            <div>
              <img
                className={styles.coverImage}
                src={draft.coverImage}
                alt={`${draft.title}`}
              />
            </div>
            <Button
              variant={VARIANTS.DESTRUCTIVE}
              onClick={handleCoverImageDelete}
            >
              Delete Cover Image
            </Button>
          </React.Fragment>
        )}
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

export default connect(
  mapStateToProps,
  {
    addStoryPart,
    deleteStoryPart,
    deleteDraft,
    changeGenre,
    publishAdventure,
    setCoverImage,
  }
)(Draft);
