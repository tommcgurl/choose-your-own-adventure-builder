import React from 'react';
import { UserLink as SharedUserLink } from '../../shared/components';

const UserLink = ({ ...props }) => {
  return <SharedUserLink {...props} app="reader" />;
};

export default UserLink;
