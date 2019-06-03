import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import emptyOrSpecialCharacters from '../../../shared/validators/emptyOrSpecialCharacters';
import {
  addStoryPart,
  deleteDraft,
  editStoryPart,
} from '../../actions/draftActions';
import * as routes from '../../constants/routes';
import getCurrentDraft from '../../selectors/getCurrentDraft';

const Draft = ({ draft, edit, addStoryPart, deleteDraft, history }) => {
  const [newStoryPartKey, setNewStoryPartKey] = useState('');

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
    history.push(routes.ROOT + routes.DRAFTS);
    console.log('second line executed');
    deleteDraft(draft.id);
  }

  return (
    <div>
      <div>Title: {draft.title}</div>
      <Link
        to={routes.ROOT + routes.EDIT}
        onClick={() => edit('intro', draft.intro)}
      >
        Intro
      </Link>
      <div>
        Parts:
        <ul>
          {Object.keys(draft.mainStory.storyParts).map(key => (
            <li key={key}>
              <Link
                to={routes.ROOT + routes.EDIT}
                onClick={() => edit(key, draft.mainStory.storyParts[key].plot)}
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
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <button onClick={handleDeleteDraft}>DELETE DRAFT?</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    draft: getCurrentDraft(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    edit: (key, contents) => {
      dispatch(editStoryPart(key, contents));
    },
    addStoryPart: (key, adventureId) => {
      dispatch(addStoryPart(key, adventureId));
    },
    deleteDraft: draftId => {
      dispatch(deleteDraft(draftId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draft);
