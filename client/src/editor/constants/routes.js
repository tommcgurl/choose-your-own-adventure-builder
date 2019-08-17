import * as sharedRoutes from '../../shared/constants/routes';

export const ROOT = '/editor';
export const DRAFTS = ROOT + '/drafts';
export const DRAFT = DRAFTS + '/:draftId';
export const EDIT = DRAFT + '/:storyPartKey';
export const NEW_ADVENTURE = ROOT + '/new_adventure';
export const AUTH_REDIRECT = ROOT + '/authredirect';
export const PUBLISHED = ROOT + '/published';
export const PUBLISHED_ADVENTURE = PUBLISHED + '/:adventureId';
export const NOT_FOUND = ROOT + sharedRoutes.NOT_FOUND;
export const CREATE_USERNAME = ROOT + sharedRoutes.CREATE_USERNAME;
