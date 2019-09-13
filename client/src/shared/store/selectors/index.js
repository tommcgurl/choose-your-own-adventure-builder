export function genresSelector(state) {
  return state.lists.genres;
}

export function tokenSelector(state) {
  return state.token;
}

export function userSettingsSelector(state) {
  console.log(state);
  return state.userSettings;
}
