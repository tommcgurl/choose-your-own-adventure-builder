import initialState from '../../../reader/store/initialState';
import { SANS_SERIF, SERIF } from '../../constants/fontTypes';
import {
  CHANGE_FONT_TYPE,
  DECREASE_FONT_SIZE,
  INCREASE_FONT_SIZE,
  RESET_FONT_SIZE,
  TOGGLE_NIGHT_MODE,
} from '../actions/userSettingsActions';

export default function userSettingsReducer(
  userSettings = initialState.userSettings,
  action
) {
  let newUserSettings = { ...userSettings };
  switch (action.type) {
    case TOGGLE_NIGHT_MODE:
      newUserSettings.nightMode = !newUserSettings.nightMode;
      return newUserSettings;
    case INCREASE_FONT_SIZE:
      if (newUserSettings.fontSize < 2.5) {
        newUserSettings.fontSize += 0.25;
      }
      return newUserSettings;
    case DECREASE_FONT_SIZE:
      if (newUserSettings.fontSize > 0.75) {
        newUserSettings.fontSize -= 0.25;
      }
      return newUserSettings;
    case RESET_FONT_SIZE:
      newUserSettings.fontSize = 1;
      return newUserSettings;
    case CHANGE_FONT_TYPE:
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
