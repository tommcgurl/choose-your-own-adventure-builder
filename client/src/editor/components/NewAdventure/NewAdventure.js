import React, { useState } from 'react';
import { connect } from 'react-redux';
import emptyOrSpecialCharacters from '../../../shared/validators/emptyOrSpecialCharacters';
import { createDraft } from '../../actions/draftActions';
import * as routes from '../../constants/routes';

const NewAdventure = ({ createDraft, history }) => {
  const [title, setTitle] = useState('');

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleEmbarkClick(e) {
    e.preventDefault();
    createAdventure(title);
    history.push(routes.ROOT + routes.DRAFT);
  }

  function createAdventure(title) {
    if (!emptyOrSpecialCharacters(title)) {
      const newAdventureTitle = title.trim();
      createDraft(newAdventureTitle);
    }
  }

  return (
    <form>
      <input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        autoFocus
      />
      <input
        onClick={handleEmbarkClick}
        disabled={emptyOrSpecialCharacters(title)}
        type="submit"
        value="Embark"
      />
    </form>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createDraft: title => {
      dispatch(createDraft(title));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewAdventure);