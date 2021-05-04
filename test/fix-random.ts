import IRandom from '../src/random/IRandom';

export default class FixRandom implements IRandom {
  private fixValues: number[];
  constructor(fixValues: number[]) {
    this.fixValues = fixValues.slice();
  }
  lot(min: number, max: number): number {
    const value = this.fixValues.shift();
    if (typeof value === 'number') {
      return value;
    } else {
      throw new Error('FixRandom::lot over index.');
    }
  }
}
