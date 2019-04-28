import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createDraft } from '../../actions/draftActions';

const NewAdventure = ({ createDraft }) => {
  const [title, setTitle] = useState('');
  const validTitle = /[a-zA-Z]+/;

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleEmbarkClick(e) {
    e.preventDefault();
    createAdventure(title);
  }

  function createAdventure(title) {
    if (validTitle.test(title)) {
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
        disabled={!validTitle.test(title)}
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
  mapDispatchToProps,
)(NewAdventure);
