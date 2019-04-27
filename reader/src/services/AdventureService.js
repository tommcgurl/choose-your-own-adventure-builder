import StoryJson from '../mock_data/example-story.json';
// import adventures from '../mock_data/adventures';

class AdventureService {
  static getAdventures() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([...adventures]);
    //   }, 1000);
    // });
    return fetch('http://localhost:3002/adventures')
      .then(res => {
        if (res.ok) return res.json();
        else console.error(res);
      })
      .then(adventuresInfinityWar => {
        return adventuresInfinityWar.adventures;
      });
  }

  static getAdventure(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...StoryJson });
      }, 1000);
    });
  }
}

export default AdventureService;
