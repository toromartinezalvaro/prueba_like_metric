import groupServiceDefinition from './groupServiceDefinition';
import Services from '../services';

export default class groupService extends Services {
  getAllGroup() {
    return this.get(groupServiceDefinition.groupBase());
  }

  createGroup(data) {
    return this.post(groupServiceDefinition.groupBase(), data);
  }

  deleteGroup(data) {
    return this.delete(groupServiceDefinition.groupBase(), data);
  }

  getAllItems() {
    return this.get(groupServiceDefinition.itemBase());
  }

  createItem(data) {
    return this.post(groupServiceDefinition.itemBase(), data);
  }

  deleteItem(data) {
    return this.delete(groupServiceDefinition.itemBase(), data);
  }
}
