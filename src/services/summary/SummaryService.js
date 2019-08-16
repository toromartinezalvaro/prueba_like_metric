import SummaryServiceDefinitions from "./SummaryServiceDefinition";
import Services from "../services";

export default class SchemeServices extends Services {
  getSummaries(towerId) {
    return this.get(SummaryServiceDefinitions.summary(towerId));
  }
}
