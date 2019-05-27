import { ContentState, convertToRaw } from 'draft-js';
import uuidv4 from 'uuid/v4';

export default class Adventure {
  id = uuidv4();
  published = false;
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

  constructor(title) {
    this.title = title;
  }
}