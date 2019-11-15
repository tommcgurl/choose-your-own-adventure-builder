import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

const UserLink = ({ username }) => (
  <Link to={routes.PROFILE.replace(':username', username)}>{username}</Link>
);

export default UserLink;
