import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import * as routes from '../constants/routes';

const AuthRedirect = ({ match }) => {
  let token;
  try {
    token = jwtDecode(match.params.token);
  } catch (err) {
    return <Redirect to={routes.NOT_FOUND} />;
  }
  return (
    <div>
      Hello from AuthRedirect. <pre>{JSON.stringify(token, null, 2)}</pre>
    </div>
  );
};

export default AuthRedirect;
