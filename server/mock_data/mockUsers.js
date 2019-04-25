let users = [];
for (let i = 1; i <= 10; i++) {
  users.push({
    id: i,
    username: `User ${i}`,
    password: `password${i}`
  });
}

module.exports = users;
