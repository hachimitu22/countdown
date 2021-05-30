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
    return new Promise(async () => {
      return this.timer.wait(30);
    })
    .then(() => {
      this.cleared = true;
      return Promise.resolve();
    });
  }
  stop(): void {
    this.sound.stop();
    this.timer.stop();
  }
  isClear(): boolean {
    return this.cleared;
  }
}
