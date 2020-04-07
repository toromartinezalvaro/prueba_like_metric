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

const makeArrayDataSets = (line, i) => {
  if (GRAPH_BASE) {
    const incrementsFixed = line.increments.map(
      (increment) => increment && increment.toFixed(2),
    );
    return {
      id: GRAPH_BASE[i].id,
      data: [...incrementsFixed],
      label: GRAPH_BASE[i].label,
      borderColor: GRAPH_BASE[i].borderColor,
      backgroundColor: GRAPH_BASE[i].backgroundColor,
      fill: GRAPH_BASE[i].fill,
      lineTension: 0.05,
      percentage: line.percentage,
    };
  }
  return null;
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
