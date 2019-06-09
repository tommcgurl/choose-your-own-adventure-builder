import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import emptyOrSpecialCharacters from '../../../shared/validators/emptyOrSpecialCharacters';
import {
  addStoryPart,
  changeGenre,
  deleteDraft,
} from '../../actions/draftActions';
import * as routes from '../../constants/routes';

const Draft = ({
  addStoryPart,
  deleteDraft,
  getCurrentDraft,
  match,
  genres,
  changeGenre,
}) => {
  const [newStoryPartKey, setNewStoryPartKey] = useState('');

  const draft = getCurrentDraft(match.params.draftId);
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
          value={draft.genre && draft.genre.id}
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={handleDeleteDraft}>DELETE DRAFT</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    getCurrentDraft: id => state.editor.drafts[id],
    genres: state.editor.lists.genres,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draft);
