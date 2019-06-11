import { createSelector } from 'reselect';
import publishedAdventuresSelector from './publishedAdventuresSelector';

export default createSelector(
  publishedAdventuresSelector,
  publishedAdventures => id => publishedAdventures.find(a => a.id === id)
);
