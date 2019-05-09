import uuidv4 from 'uuid/v4';
import { ContentState, convertToRaw } from 'draft-js';

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
  colorPalette = {
    background: '',
    mainText: '',
    subText: '',
  };

  constructor(title) {
    this.title = title;
  }
}
