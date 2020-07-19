export default class Numbers {
  static toFixed = (number, decimal = 2) => {
    if (number && number !== Infinity && !Number.isNaN(number)) {
      return Number(number).toFixed(decimal);
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
