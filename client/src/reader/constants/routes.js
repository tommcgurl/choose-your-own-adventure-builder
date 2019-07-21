import * as sharedRoutes from '../../shared/constants/routes';

export const ROOT = '/reader';
export const LIBRARY = ROOT + '/library';
export const COVER = ROOT + '/:adventureId';
export const READ = LIBRARY + '/:adventureId/read';
export const AUTH_REDIRECT = ROOT + '/authredirect/:token';
export const NOT_FOUND = ROOT + sharedRoutes.NOT_FOUND;
