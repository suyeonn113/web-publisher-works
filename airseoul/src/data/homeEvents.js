import { getActiveEvents } from '../services/events';
import { events } from './events';

export const homeEvents = getActiveEvents(events);