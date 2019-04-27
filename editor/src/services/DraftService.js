import drafts from '../mock_data/drafts';

let bullshitId = 666;

export default class DraftService {
  static getDrafts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([...drafts]);
      }, 1000);
    });
  }

  static createDraft(draft) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ...draft, id: bullshitId++ });
      }, 1000);
    });
  }
}
