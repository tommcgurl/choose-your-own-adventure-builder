import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';
import { decodeToken } from '../services/authService';
import userService from '../services/userService';
import Input from './Input/Input';

function isValidUsername(username) {
  return (
    /^\w+$/.test(username) &&
    !/^_/.test(username) &&
    !/_$/.test(username) &&
    !/_{2,}/.test(username)
  );
}

const CreateUsername = ({ rootPath, location, history }) => {
  const [username, setUsername] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  function handleUsernameChange(e) {
    const trimmedInput = e.target.value.trim();
    setUsername(trimmedInput);
    if (isValidUsername(trimmedInput)) {
      setValidationMessage('Validating');
      userService.fetchUser(trimmedInput).then(user => {
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
      .then(token => {
        history.replace(
          rootPath + routes.AUTH_REDIRECT + `?userToken=${token}`
        );
      });
  }

  if (
    location.state.providerToken &&
    decodeToken(location.state.providerToken)
  ) {
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
          />
          <span>{validationMessage}</span>
          <button
            type="submit"
            disabled={validationMessage || !isValidUsername(username)}
          >
            CREATE
          </button>
        </form>
      </div>
    );
  }
  return <Redirect to={rootPath + routes.NOT_FOUND} />;
};

export default CreateUsername;
