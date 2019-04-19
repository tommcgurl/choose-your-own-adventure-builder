import { createSelector } from 'reselect';

const getVisibilityFilter = state => state.visibilityFilter;
const getStories = state => state.stories;
const getUser = state => state.user;

export const getVisibleStories = createSelector(
  [getVisibilityFilter, getStories, getUser],
  (visibilityFilter, stories, user) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return [...stories];
      case 'SHOW_UNREAD':
        return stories.filter(s => !user.storiesRead.some(id => id === s.id));
      default:
        return [...stories];
    }
  },
);
