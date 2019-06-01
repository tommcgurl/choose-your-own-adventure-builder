class LibraryService {
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
