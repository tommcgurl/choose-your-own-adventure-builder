import * as sharedRoutes from '../../shared/constants/routes';

export const ROOT = '/reader';
export const LIBRARY = ROOT + '/library';
export const READ = ROOT + '/read/:adventureId';
export const AUTH_REDIRECT = ROOT + '/authredirect/:token';
export const NOT_FOUND = ROOT + sharedRoutes.NOT_FOUND;
