import {
  DECREASE_FONT_SIZE,
  FONT_CHANGE_TO_SANS_SERIF,
  FONT_CHANGE_TO_SERIF,
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
export function fontChangeToSerif() {
  return { type: FONT_CHANGE_TO_SERIF };
}
export function fontChangeToSansSerif() {
  return { type: FONT_CHANGE_TO_SANS_SERIF };
}
