const actionTypeRoot = '[SHARED_USER_SETTINGS]';

export const TOGGLE_NIGHT_MODE = `${actionTypeRoot} TOGGLE_NIGHT_MODE`;
export function toggleNightMode() {
  return { type: TOGGLE_NIGHT_MODE };
}

export const INCREASE_FONT_SIZE = `${actionTypeRoot} INCREASE_FONT_SIZE`;
export function increaseFontSize() {
  return { type: INCREASE_FONT_SIZE };
}

export const DECREASE_FONT_SIZE = `${actionTypeRoot} DECREASE_FONT_SIZE`;
export function decreaseFontSize() {
  return { type: DECREASE_FONT_SIZE };
}

export const RESET_FONT_SIZE = `${actionTypeRoot} RESET_FONT_SIZE`;
export function resetFontSize() {
  return { type: RESET_FONT_SIZE };
}

export const CHANGE_FONT_TYPE = `${actionTypeRoot} CHANGE_FONT_TYPE`;
export function toggleFontType() {
  return { type: CHANGE_FONT_TYPE };
}
