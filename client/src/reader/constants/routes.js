import * as sharedRoutes from '../../shared/constants/routes';

export const ROOT = '/reader';
export const NOT_FOUND = ROOT + sharedRoutes.NOT_FOUND;
export const CREATE_USERNAME = ROOT + sharedRoutes.CREATE_USERNAME;
export const AUTH_REDIRECT = ROOT + sharedRoutes.AUTH_REDIRECT;
export const COVER = ROOT + '/cover/:adventureId';
export const LIBRARY = ROOT + '/library';
export const READ = LIBRARY + '/:adventureId';
export const PROFILE = ROOT + '/profile/:userId';
