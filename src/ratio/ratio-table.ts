import IRandom from "../random/IRandom";
import RatioRecord from "./ratio-record";

export default class RatioTable<T> {
  private ratioSum: number;
  constructor(private ratios: Array<RatioRecord<T>>) {
    this.ratioSum = ratios.reduce((sum: number, cur: RatioRecord<T>) => {
      return sum + cur.ratio;
    }, 0);
  }
  lot(random: IRandom): T {
    let rand: number = random.lot(1, this.ratioSum);
    const drawn: RatioRecord<T> | undefined = this.ratios.find(function (ratio: RatioRecord<T>) {
      rand -= ratio.ratio;
      return rand <= 0;
    });

    if (drawn instanceof RatioRecord) {
      return drawn.value;
    } else {
      throw new Error(`${RatioTable.constructor.name}: ratio sum is over.`);
    }
  }
}