import definitions from './properties.definitions';
import Services from '../services';

export default class PropertyServices extends Services {
  getPropertyInfo(id) {
    return this.get(definitions.getPropertyInfo(id));
  }
}
