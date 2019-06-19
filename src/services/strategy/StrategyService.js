import StrategyDefinitions from './StrategyServiceDefinitions'
import Services from '../services'

export default class StrategyServices extends Services {
  getStrategies(towerId) {
    return this.get(StrategyDefinitions.strategy(towerId))
  }
}