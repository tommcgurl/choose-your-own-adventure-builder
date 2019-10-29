import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditableTitle.module.css';

const EditableTitle = ({ initialTitle }) => {

  const [newTitle, setNewTitle] = useState(initialTitle);

  const handleInputChange = (event) => {
    setNewTitle(event.target.value);
  }

  const handleInputBlur = (event) => {

  }

  return (
    <input
      className={styles.input}
      onBlur={handleInputBlur}
      onChange={handleInputChange}
      value={newTitle}
    />
  );
}


EditableTitle.propTypes = {
  title: PropTypes.string,
}

export default EditableTitle;