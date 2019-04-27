// import drafts from '../mock_data/drafts';

let bullshitId = 666;

export default class DraftService {
  static getDrafts() {
    console.log('getDrafts was called');
    // This will eventually pass a token
    // in order to identify the user whose drafts we want
    return fetch(`/drafts`)
      .then(result => {
        if (result.ok) return result.json();
        console.error(result);
      })
      .then(drafts => {
        console.log(drafts);
        return drafts;
      });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([...drafts]);
    //   }, 1000);
    // });
  }

  static createDraft(draft) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...draft, id: bullshitId++ });
      }, 1000);
    });
  }
}
