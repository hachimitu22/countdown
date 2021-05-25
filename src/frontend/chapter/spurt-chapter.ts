import BaseChapter from './base-chapter';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class SpurtChapter extends BaseChapter {
  private current: number;
  constructor(
    initialCount: number,
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
    this.current = initialCount;
  }
  play(): Promise<void> {
    return this.sound.play(`0${this.current}.wav`)
      .then(() => {
        const waitSec = this.random.lot(5, 10);
        return this.timer.wait(waitSec);
      })
      .then(() => {
        if (this.current > 0) this.current--;
        this.cleared = this.current <= 0;

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