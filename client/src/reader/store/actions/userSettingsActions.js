export const types = {
  TOGGLE_NIGHT_MODE: 'READER_SETTINGS_TOGGLE_NIGHT_MODE',
  INCREASE_FONT_SIZE: 'READER_SETTINGS_INCREASE_FONT_SIZE',
  DECREASE_FONT_SIZE: 'READER_SETTINGS_DECREASE_FONT_SIZE',
  RESET_FONT_SIZE: 'READER_SETTINGS_RESET_FONT_SIZE',
  CHANGE_FONT_TYPE: 'READER_SETTINGS_CHANGE_FONT_TYPE',
};

export function toggleNightMode() {
  return { type: types.TOGGLE_NIGHT_MODE };
}
export function increaseFontSize() {
  return { type: types.INCREASE_FONT_SIZE };
}
export function decreaseFontSize() {
  return { type: types.DECREASE_FONT_SIZE };
}
export function resetFontSize() {
  return { type: types.RESET_FONT_SIZE };
}
export function toggleFontType() {
  return { type: types.CHANGE_FONT_TYPE };
}
