export default class Numbers {
  static toFixed = (number) => {
    if (number && number !== Infinity && !Number.isNaN(number)) {
      return Number(number).toFixed(2);
    }
    return 0;
  };

  static cleanNumber = (number) => {
    if (number && number !== Infinity && !Number.isNaN(number)) {
      return Number(number);
    }
    return 0;
  };
}
