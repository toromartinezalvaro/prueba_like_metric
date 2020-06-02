import { API_PATH } from '../../config/config';

const EventServicesDefinition = {
  eventRoute: (towerId) => {
    return `${API_PATH}event/${towerId}`;
  },
  getEventById: (id, towerId) => {
    return `${API_PATH}event/${towerId}/find/${id}`;
  },
};

export default EventServicesDefinition;
