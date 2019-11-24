import React, { useEffect, useState } from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Box, Button, BUTTON_VARIANTS, Inline, Stack } from '..';
import * as routes from '../../constants/routes';
import userService from '../../services/userService';
import styles from './Profile.module.css';

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

  const { path, url } = useRouteMatch();

  return (
    <React.Fragment>
      {loading ? (
        'Loading...'
      ) : user ? (
        <Box>
          <Box className={styles.backdrop}>
            <Stack align="center">
              <img
                src={user.photo}
                alt={user.username}
                className={styles.userPhoto}
              />
              <Box component="h1" padding="none">
                {user.username}
              </Box>
              <Inline align="center">
                <Stack align="center" padding="none">
                  <div>{user.bibliography.length}</div>
                  <div>Works</div>
                </Stack>
                <Stack align="center" padding="none">
                  <div>{user.library.length}</div>
                  <div>Library</div>
                </Stack>
              </Inline>
            </Stack>
          </Box>
          <Inline>
            <Link to={`${url}/bio`}>
              <Button variant={BUTTON_VARIANTS.BORDERLESS}>Bio</Button>
            </Link>
            <Link to={`${url}/bibligraphy`}>
              <Button variant={BUTTON_VARIANTS.BORDERLESS}>Bibliography</Button>
            </Link>
          </Inline>
          <Switch>
            <Route exact path={path}>
              <Bio user={user} />
            </Route>
            <Route path={`${path}/bio`}>
              <Bio user={user} />
            </Route>
            <Route path={`${path}/bibligraphy`}>
              <Bibligraphy user={user} />
            </Route>
          </Switch>
        </Box>
      ) : (
        <Redirect to={routes.NOT_FOUND} />
      )}
    </React.Fragment>
  );
};

const Bio = ({ user }) => {
  return <Box shadow>{user.bio}</Box>;
};

const Bibligraphy = ({ user }) => {
  return (
    <Box shadow>
      <Stack>
        {user.bibliography.map(book => (
          <div key={book.id}>{book.title}</div>
        ))}
      </Stack>
    </Box>
  );
};

export default Profile;
