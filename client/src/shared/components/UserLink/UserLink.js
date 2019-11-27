import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const UserLink = ({ username, app, ...rest }) => {
  const appRoute = app === 'reader' ? '/reader' : '/editor';
  return (
    <Link
      to={appRoute + routes.PROFILE.replace(':username', username)}
      {...rest}
    >
      {username}
    </Link>
  );
};

UserLink.propTypes = {
  username: PropTypes.string.isRequired,
  app: PropTypes.oneOf(['reader', 'editor']).isRequired,
};

export default UserLink;
