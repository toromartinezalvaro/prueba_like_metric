import { API_PATH } from '../../config/config';

const EventServicesDefinition = {
  eventRoute: (towerId) => {
    return `${API_PATH}event/${towerId}`;
  },
  eventEdit: () => {
    return `${API_PATH}event/edit/`;
  },
  getEventById: (id, towerId) => {
    return `${API_PATH}event/${towerId}/find/${id}`;
  },
};

export default EventServicesDefinition;
