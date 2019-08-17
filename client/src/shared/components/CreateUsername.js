import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import userService from '../services/userService';
import authService from '../services/authService';

function isValidUsername(text) {
  return (
    /^\w+$/.test(text.trim()) &&
    !/^_/.test(text.trim()) &&
    !/_$/.test(text.trim()) &&
    !/_{2,}/.test(text.trim())
  );
}

const CreateUsername = ({ rootPath, location, history }) => {
  const [username, setUsername] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    if (isValidUsername(e.target.value)) {
      setValidationMessage('Validating');
      userService.fetchUser(e.target.value).then(user => {
        if (user) {
          setValidationMessage('Username taken');
        } else {
          setValidationMessage('');
        }
      });
    } else {
      setValidationMessage(
        'Invalid username. (Only letters separated by single underscores are permitted)'
      );
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    userService
      .createUser(username, location.state.providerToken)
      .then(user => {
        if (user) {
          // history.replace(rootPath);
        }
      });
  }

  if (
    location.state.providerToken &&
    authService.decodeToken(location.state.providerToken)
  ) {
    return (
      <div>
        <pre>
          {JSON.stringify(
            authService.decodeToken(location.state.providerToken)
          )}
        </pre>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
          />
          <span>{validationMessage}</span>
          <button type="submit" disabled={validationMessage}>
            CREATE
          </button>
        </form>
      </div>
    );
  }
  return <Redirect to={rootPath + routes.NOT_FOUND} />;
};

export default CreateUsername;
