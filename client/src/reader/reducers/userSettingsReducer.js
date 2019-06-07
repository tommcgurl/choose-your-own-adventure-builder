import * as types from '../constants/actionTypes';
import initialState from '../store/initialState';

export default function userSettingsReducer(
  userSettings = initialState.userSettings,
  action
) {
  let newUserSettings = { ...userSettings };
  switch (action.type) {
    case types.TOGGLE_NIGHT_MODE:
      newUserSettings.nightMode = !newUserSettings.nightMode;
      return newUserSettings;
    case types.INCREASE_FONT_SIZE:
      newUserSettings.fontSize += 0.25;
      return newUserSettings;
    case types.DECREASE_FONT_SIZE:
      if (newUserSettings.fontSize > 0.5) {
        newUserSettings.fontSize -= 0.25;
      }
      return newUserSettings;
    case types.RESET_FONT_SIZE:
      newUserSettings.fontSize = 1;
      return newUserSettings;
    default:
      return userSettings;
  }
}
