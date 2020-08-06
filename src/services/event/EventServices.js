import EventServicesDefinition from './EventServicesDefinition';
import Services from '../services';

export default class EventServices extends Services {
  getById(id, towerId) {
    return this.get(EventServicesDefinition.eventRoute(towerId));
  }

  getAll(towerId) {
    return this.get(EventServicesDefinition.eventRoute(towerId));
  }

  postEvent(towerId, data) {
    return this.post(EventServicesDefinition.eventRoute(towerId), data);
  }

  putEvent(towerId, data) {
    return this.put(EventServicesDefinition.eventEdit(), data);
  }

  deleteEvent(towerId, data) {
    return this.delete(EventServicesDefinition.eventRoute(towerId), data);
  }
}
