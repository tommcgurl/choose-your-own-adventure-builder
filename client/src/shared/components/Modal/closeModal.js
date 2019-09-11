import eventService from '../../services/eventService';
import { CLOSE_MODAL_EVENT } from './constants';

export default function closeModal(content, options) {
  eventService.emit(CLOSE_MODAL_EVENT);
}

