export default class Numbers {
  static toFixed = (number) => {
    if (number && !Number.isNaN(number)) {
      return number.toFixed(2);
    }
    return 0;
  };
}
