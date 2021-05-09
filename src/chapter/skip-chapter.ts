import BaseChapter from './base-chapter';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class SkipChapter extends BaseChapter {
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
        const waitSec = this.random.lot(1, 5);
        this.timer.wait(waitSec);

        if (this.current >= 3) {
          const rand: number = this.random.lot(1, this.current);

          this.current--;
          if (rand <= 2) {
            this.current = 1;
          }
        } else {
          this.current--;
        }

        this.cleared = this.current <= 0;

        return Promise.resolve();
      });
  }
  isClear(): boolean {
    return this.cleared;
  }
}
