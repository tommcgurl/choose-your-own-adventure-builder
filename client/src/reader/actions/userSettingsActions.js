import {
  CHANGE_FONT_TYPE,
  DECREASE_FONT_SIZE,
  INCREASE_FONT_SIZE,
  RESET_FONT_SIZE,
  TOGGLE_NIGHT_MODE,
} from '../constants/actionTypes';

export function toggleNightMode() {
  return { type: TOGGLE_NIGHT_MODE };
}
export function increaseFontSize() {
  return { type: INCREASE_FONT_SIZE };
}
export function decreaseFontSize() {
  return { type: DECREASE_FONT_SIZE };
}
export function resetFontSize() {
  return { type: RESET_FONT_SIZE };
}
export function toggleFontType() {
  return { type: CHANGE_FONT_TYPE };
}
