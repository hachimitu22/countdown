import BaseChapter from './base-chapter';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class FastChapter extends BaseChapter {
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
    return this.sound.play(`${this.current}.wav`)
      .then(() => {
        if (this.current > 0) this.current--;
        this.cleared = this.current <= 0;

        return Promise.resolve();
      });
  }
  isClear(): boolean {
    return this.cleared;
  }
}