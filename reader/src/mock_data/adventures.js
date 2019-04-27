const adventures = [];
for (let i = 1; i <= 50; i++) {
  adventures.push({
    id: i,
    title: `Title ${i}`,
    author: `Author ${i}`,
    tags: [],
  });
}
export default adventures;
