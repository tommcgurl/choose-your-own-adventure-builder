import StoryJson from '../example-story.json';

let stories = [];
for (let i = 1; i <= 50; i++) {
  stories.push({
    id: i,
    title: `Title ${i}`,
    author: `Author ${i}`,
    tags: [],
  });
}

class StoryService {
  static getStories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...stories]);
      }, 1000);
    });
  }

  static getStory(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...StoryJson });
      }, 1000);
    });
  }
}

export default StoryService;
