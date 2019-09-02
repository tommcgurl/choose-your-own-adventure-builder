import eventService from '../../services/eventService';
import { OPEN_MODAL_EVENT } from './constants';

/**
 * @typedef {import('react').Component} Component
 */

/**
 * @typedef {import('react').SFC} SFC
 */

/**
 * @typedef {Object} Options
 * @property {boolean} [clickAwayEnabled] Whether or not clicking away from the modal conent should close the modal.
 * @property {('small'|'medium'|'large')} [size] The size of the modal you want to be rendered. Large is 80vw, medium is 50vw, and small is 30vw.
 * @property {string} [title]
 */

/**
 *
 * @param {string|Component|SFC} content
 * @param {Options} [options]
 */
function popModal(content, options) {
  eventService.emit(OPEN_MODAL_EVENT, content, options);
}

export default popModal;
