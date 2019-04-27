const drafts = [];

for (let i = 1; i < 5; i++) {
  drafts.push({
    id: i,
    title: `Title ${i}`,
    authorIds: [1],
  });
}

export default drafts;
