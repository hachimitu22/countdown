import BaseChapter from './base-chapter';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class StopChapter extends BaseChapter {
  constructor(
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
  }
  play(): Promise<void> {
    return this.sound.play(`stop.wav`)
      .then(() => {
        const waitSec = this.random.lot(10, 15);
        this.timer.wait(waitSec);
        this.cleared = true;

        return Promise.resolve();
      });
  }
  isClear(): boolean {
    return this.cleared;
  }
}
