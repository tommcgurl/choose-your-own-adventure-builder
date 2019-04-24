import StoryJson from "../example-story.json";

// let adventures = [];
// for (let i = 1; i <= 50; i++) {
//   adventures.push({
//     id: i,
//     title: `Title ${i}`,
//     author: `Author ${i}`,
//     tags: []
//   });
// }

class AdventureService {
  static getAdventures() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([...adventures]);
    //   }, 1000);
    // });
    return fetch("http://localhost:3002/adventures")
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
