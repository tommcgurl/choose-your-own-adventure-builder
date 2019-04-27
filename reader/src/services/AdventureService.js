// import AdventureJson from '../mock_data/example-adventure.json';
// import adventures from '../mock_data/adventures';

class AdventureService {
  static getAdventures() {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([...adventures]);
    //   }, 1000);
    // });
    return fetch('/adventures')
      .then(res => {
        if (res.ok) return res.json();
        else console.error(res);
      })
      .then(adventures => {
        return adventures;
      });
  }

  static getAdventure(id) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({ ...AdventureJson });
    //   }, 1000);
    // });
    return fetch(`/adventures/${id}`)
      .then(res => {
        if (res.ok) return res.json();
        else console.error(res);
      })
      .then(adventure => {
        return adventure;
      });
  }
}

export default AdventureService;
