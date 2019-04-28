// import drafts from '../mock_data/drafts';
// import AdventureJson from '../mock_data/example-adventure.json';

// let bullshitId = 666;

export default class DraftService {
  static getDrafts() {
    // This will eventually pass a token
    // in order to identify the user whose drafts we want
    return fetch('/drafts')
      .then(result => {
        if (result.ok) return result.json();
        console.error(result);
      })
      .then(drafts => {
        return drafts;
      });
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve([...drafts]);
    //   }, 1000);
    // });
  }

  static getDraft(id) {
    return fetch(`/drafts/${id}`)
      .then(result => {
        if (result.ok) return result.json();
        console.error(result);
      })
      .then(draft => {
        return draft;
      });
  }

  static createDraft(draft) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({ ...AdventureJson, title: draft.title, id: bullshitId++ });
    //   }, 1000);
    // });
    return fetch('/drafts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(draft)
    })
      .then(result => {
        if (result.ok) return result.json();
        console.error(result);
      })
      .then(draft => {
        return draft;
      });
  }
}
