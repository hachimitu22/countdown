import BaseChapter from './base-chapter';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class HoldChapter extends BaseChapter {
  constructor(
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
  }
  play(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.timer.wait(30);
      this.cleared = true;
      resolve();
    });
  }
  isClear(): boolean {
    return this.cleared;
  }
}