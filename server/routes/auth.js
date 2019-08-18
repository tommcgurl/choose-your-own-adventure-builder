const {
  generateToken,
  parseTokenFromHeaders,
  decodeToken,
} = require('../services/tokenService');
const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const { isValidUsername } = require('../validators');

const readerTokenRedirect = (req, res) => {
  if (req.user) {
    const token = generateToken(req.user);
    if (req.user.username) {
      res.redirect(
        `${process.env.CLIENT_URL}/reader/authredirect?userToken=${token}`
      );
    } else {
      res.redirect(
        `${process.env.CLIENT_URL}/reader/authredirect?providerToken=${token}`
      );
    }
  } else {
    res.status(500).send('¯_(ツ)_/¯');
  }
};

const editorTokenRedirect = (req, res) => {
  if (req.user) {
    const token = generateToken(req.user);
    if (req.user.username) {
      res.redirect(
        `${process.env.CLIENT_URL}/editor/authredirect?userToken=${token}`
      );
    } else {
      res.redirect(
        `${process.env.CLIENT_URL}/editor/authredirect?providerToken=${token}`
      );
    }
  } else {
    res.status(500).send('¯_(ツ)_/¯');
  }
};

module.exports = function authRouter(passport) {
  router.get(
    '/reader/google',
    passport.authenticate('google', {
      callbackURL: 'http://localhost:3002/auth/reader/google/redirect',
      scope: ['profile'],
    })
  );

  router.get(
    '/reader/google/redirect',
    passport.authenticate('google', {
      callbackURL: 'http://localhost:3002/auth/reader/google/redirect',
      session: false,
    }),
    readerTokenRedirect
  );

  router.get(
    '/editor/google',
    passport.authenticate('google', {
      callbackURL: 'http://localhost:3002/auth/editor/google/redirect',
      scope: ['profile'],
    })
  );

  router.get(
    '/editor/google/redirect',
    passport.authenticate('google', {
      callbackURL: 'http://localhost:3002/auth/editor/google/redirect',
      session: false,
    }),
    editorTokenRedirect
  );

  // router.get(
  //   '/editor/account_created',
  //   setUserInBodyOnRequestMiddleware,
  //   editorTokenRedirect
  // );

  router.get(
    '/reader/facebook',
    passport.authenticate('facebook', {
      callbackURL: 'http://localhost:3002/auth/reader/facebook/redirect',
    })
  );

  router.get(
    '/reader/facebook/redirect',
    passport.authenticate('facebook', {
      session: false,
      callbackURL: 'http://localhost:3002/auth/reader/facebook/redirect',
    }),
    readerTokenRedirect
  );

  router.get(
    '/editor/facebook',
    passport.authenticate('facebook', {
      callbackURL: 'http://localhost:3002/auth/editor/facebook/redirect',
    })
  );

  router.get(
    '/editor/facebook/redirect',
    passport.authenticate('facebook', {
      session: false,
      callbackURL: 'http://localhost:3002/auth/editor/facebook/redirect',
    }),
    editorTokenRedirect
  );

  router.post('/create_user', async (req, res) => {
    const token = parseTokenFromHeaders(req.headers);
    const decodedToken = decodeToken(token);
    if (
      decodedToken &&
      decodedToken.provider &&
      decodedToken.providerId &&
      req.body &&
      req.body.username &&
      isValidUsername(req.body.username.trim())
    ) {
      const user = await queries.createUser(
        req.body.username.trim(),
        decodedToken.provider,
        decodedToken.providerId
      );
      if (user) {
        res.send(generateToken(user));
      } else {
        res.status(500).send('¯_(ツ)_/¯');
      }
    } else {
      res.status(500).send('¯_(ツ)_/¯');
    }
  });

  // Twitter OAuth requires session support, but here's what it'd look like if it was cool and didn't.

  // router.get(
  //   "/reader/twitter",
  //   passport.authenticate("twitter", {
  //     callbackURL: "http://localhost:3002/auth/reader/twitter/redirect"
  //   })
  // );

  // router.get(
  //   "/reader/twitter/redirect",
  //   passport.authenticate("twitter", {
  //     session: false,
  //     callbackURL: "http://localhost:3002/auth/reader/twitter/redirect"
  //   }),
  //   readerTokenRedirect
  // );

  return router;
};
