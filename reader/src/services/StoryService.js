const stories = [
  {
    id: 1,
    title: 'title1',
    author: 'a1',
  },
  {
    id: 2,
    title: 'title2',
    author: 'a2',
  },
  {
    id: 3,
    title: 'title3',
    author: 'a3',
  },
];

class StoryService {
  static getStories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('i was called');
        resolve([...stories]);
      }, 1000);
    });
  }
}

export default StoryService;
