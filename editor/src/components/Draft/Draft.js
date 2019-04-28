import React, { useState } from 'react';
import { connect } from 'react-redux';
import getCurrentDraft from '../../selectors/getCurrentDraft';
import {
  selectToEditStoryPart,
  addStoryPart,
} from '../../actions/draftActions';
import emptyOrSpecialCharacters from '../../validators/emptyOrSpecialCharacters';

const Draft = ({ draft, edit, addStoryPart }) => {
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

  return (
    <div>
      <div>Title: {draft.title}</div>
      <a href="#intro" onClick={() => edit('intro', draft.intro)}>
        Intro
      </a>
      <div>
        Parts:
        <ul>
          {Object.keys(draft.mainStory.storyParts).map(key => (
            <li key={key}>
              <a
                href={`#${key}`}
                onClick={() => edit(key, draft.mainStory.storyParts[key].plot)}
              >
                {key}
              </a>
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
      dispatch(selectToEditStoryPart(key, contents));
    },
    addStoryPart: (key, adventureId) => {
      dispatch(addStoryPart(key, adventureId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draft);
