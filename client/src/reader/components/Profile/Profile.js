import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import userService from '../../../shared/services/userService';
import * as routes from '../../constants/routes';
import BrowsingLayout from '../BrowsingLayout';

const Profile = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    userService
      .getUserProfile(match.params.username)
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [match.params.username]);

  return (
    <BrowsingLayout>
      {loading ? (
        'Loading...'
      ) : user ? (
        <React.Fragment>
          <h1>Profile for {user.username}</h1>
          <div>
            <img src={user.photo} alt={user.username} />
          </div>
          <h2>Bio</h2>
          <p>{user.bio}</p>
          <h2>Bibliography</h2>
          <ul>
            {user.bibliography.map(adventure => (
              <li key={adventure.id}>{adventure.title}</li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <Redirect to={routes.NOT_FOUND} />
      )}
    </BrowsingLayout>
  );
};

export default Profile;
