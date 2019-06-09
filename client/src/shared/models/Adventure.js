import { ContentState, convertToRaw } from 'draft-js';
import uuidv4 from 'uuid/v4';

export default class Adventure {
  id = uuidv4();
  published = null;
  intro = convertToRaw(ContentState.createFromText(''));
  authors = [];
  items = {
    prompt: '',
    options: {},
    limit: 0,
  };
  mainStory = {
    firstPart: '',
    storyParts: {},
  };
  genre = null;

  constructor(title) {
    this.title = title;
  }
}
