import eventService from '../../services/eventService';
import { POP_TOAST_EVENT } from './constants';

export default function(content, variant) {
  eventService.emit(POP_TOAST_EVENT, content, variant);
}
