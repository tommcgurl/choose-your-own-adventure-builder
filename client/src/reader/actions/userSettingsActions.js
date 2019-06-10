import * as types from '../../shared/constants/actionTypes';

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
