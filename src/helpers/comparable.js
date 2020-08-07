export default class Comparable {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  objects() {
    return !Object.keys(this.left).find((key) => {
      return this.left[key] !== this.right[key];
    });
  }
}
