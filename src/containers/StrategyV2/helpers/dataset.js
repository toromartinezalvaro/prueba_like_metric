import styles from '../../../assets/styles/variables.scss';

const GRAPH_BASE = [
  { label: ['Mercado'], borderColor: '' },
  {
    id: 1,
    label: ['Continua'],
    borderColor: styles.mainColor,
    backgroundColor: styles.softMainColor,
    fill: null,
  },
  {
    id: 3,
    label: ['Semi-Continua'],
    borderColor: styles.greenColor,
    backgroundColor: styles.softGreenColor,
    fill: null,
  },
  {
    id: 9,
    label: ['Semi-Escalonada'],
    borderColor: styles.redColor,
    backgroundColor: styles.softRedColor,
    fill: null,
  },
  {
    id: 18,
    label: ['Escalonada'],
    borderColor: styles.yellowColor,
    backgroundColor: styles.softYellowColor,
    fill: null,
  },
];

const makeArrayDataSets = (line) => {
  const base = GRAPH_BASE.find((item) => item.id === line.id);
  const incrementsFixed = line.increments.map(
    (increment) => increment && increment.toFixed(2),
  );
  return {
    id: base.id,
    data: [...incrementsFixed],
    label: base.label,
    borderColor: base.borderColor,
    backgroundColor: base.backgroundColor,
    fill: base.fill,
    lineTension: 0.05,
    percentage: line.percentage,
    EARate: line.ear,
    soldInCurrentStrategy: line.soldInCurrentStrategy,
  };
};

const generateDataset = (increments) => {
  const strategyLines = {};
  increments.forEach((increment) => {
    strategyLines[increment.type] = {
      ...increment,
      strategies: increment.strategies.map(makeArrayDataSets),
    };
  });
  return strategyLines;
};

export default generateDataset;
