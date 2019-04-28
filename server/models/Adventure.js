module.exports = class Adventure {
  constructor(title, authorId) {
    this.title = title;
    this.authorIds = [authorId];
    this.id = null;
    this.intro = '';
    this.items = {
      prompt: '',
      options: {},
      limit: 0
    };
    this.mainStory = {
      firstPart: '',
      storyParts: {}
    };
    this.character = null;
    this.colorPalette = {
      background: '',
      mainText: '',
      subText: ''
    };
  }
};
