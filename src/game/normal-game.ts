import IGame from './IGame';
import BaseGame from './base-game';
import StopGame from './stop-game';
import SpurtGame from './spurt-game';
import FinishGame from './finish-game';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class NormalGame extends BaseGame {
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
        return Promise.resolve();
      });
  }
  next(): IGame {
    if (this.current > 0) this.current--;

    if (this.current > 0) {
      return this;
    }

    const value: number = this.random.lot(0, 99);
    if(value < 70) {
      return new StopGame(this.timer, this.random, this.sound);
    } else if (value < 90) {
      return new SpurtGame(9, this.timer, this.random, this.sound);
    } else {
      return new FinishGame(this.timer, this.random, this.sound);
    }
  }
  isFinish(): boolean {
    return false;
  }
}
