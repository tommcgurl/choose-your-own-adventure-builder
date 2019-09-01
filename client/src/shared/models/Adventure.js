import { ContentState, convertToRaw } from 'draft-js';
import uuidv4 from 'uuid/v4';

export default class Adventure {
  id = uuidv4();
  published = null;
  blurb = convertToRaw(ContentState.createFromText(''));
  authors = [];
  items = {
    prompt: '',
    options: {},
    limit: 0,
  };
  firstPartId = '';
  storyParts = {};
  genre = null;

  constructor(title) {
    this.title = title;
  }
}
