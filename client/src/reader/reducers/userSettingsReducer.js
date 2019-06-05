import * as types from '../constants/actionTypes';
import initialState from '../store/initialState';

export default function userSettingsReducer(
  userSettings = initialState.userSettings,
  action
) {
  switch (action.type) {
    case types.TOGGLE_NIGHT_MODE:
      const newUserSettings = { ...userSettings };
      newUserSettings.nightMode = !newUserSettings.nightMode;
      return newUserSettings;
    default:
      return userSettings;
  }
}
