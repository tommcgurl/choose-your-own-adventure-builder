import * as types from '../../shared/constants/actionTypes';
import { SANS_SERIF, SERIF } from '../constants/fontTypes';
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
      if (newUserSettings.fontSize < 4) {
        newUserSettings.fontSize += 0.25;
      }
      return newUserSettings;
    case types.DECREASE_FONT_SIZE:
      if (newUserSettings.fontSize > 0.75) {
        newUserSettings.fontSize -= 0.25;
      }
      return newUserSettings;
    case types.RESET_FONT_SIZE:
      newUserSettings.fontSize = 1;
      return newUserSettings;
    case types.CHANGE_FONT_TYPE:
      if (newUserSettings.fontType === SERIF) {
        newUserSettings.fontType = SANS_SERIF;
      } else if (newUserSettings.fontType === SANS_SERIF) {
        newUserSettings.fontType = SERIF;
      }
      return newUserSettings;
    default:
      return userSettings;
  }
}
