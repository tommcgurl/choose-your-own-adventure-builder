module.exports = function isValidUsername(username) {
  return (
    /^\w+$/.test(username) &&
    !/^_/.test(username) &&
    !/_$/.test(username) &&
    !/_{2,}/.test(username)
  );
};
