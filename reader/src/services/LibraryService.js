let stories = [];
for (let i = 1; i <= 5; i++) {
  stories.push({
    id: i,
    title: `Title ${i}`,
    author: `Author ${i}`,
    tags: [],
  });
}

class LibraryService {
  static getLibraryStories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...stories]);
      }, 1000);
    });
  }

  static addStoryToLibrary(story) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  static removeStoryFromLibrary(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

export default LibraryService;
