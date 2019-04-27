import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createDraft } from '../../actions/draftActions';

const NewAdventure = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const validTitle = /[a-zA-Z]+/;

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleEmbarkClick() {
    createAdventure(title);
  }

  function createAdventure(title) {
    if (validTitle.test(title)) {
      const newAdventureTitle = title.trim();
      console.log('about to dispatch', newAdventureTitle);
      dispatch(createDraft(newAdventureTitle, 1));
    }
  }

  return (
    <div>
      <input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        autoFocus
      />
      <button onClick={handleEmbarkClick} disabled={!validTitle.test(title)}>
        Embark
      </button>
    </div>
  );
};

export default connect()(NewAdventure);
