import IGame from './IGame';
import BaseGame from './base-game';
import NormalGame from './normal-game';
import FinishGame from './finish-game';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class SpurtGame extends BaseGame {
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
  play(): void {
    const waitSec = this.random.lot(1, 5);
    this.timer.wait(waitSec);
    this.sound.play(`0${this.current}.wav`);
  }
  next(): IGame {
    if (this.current > 0) this.current--;

    if (this.current > 0) {
      return this;
    }

    const value: number = this.random.lot(0, 99);
    if(value < 90) {
      return new NormalGame(10, this.timer, this.random, this.sound);
    } else {
      return new FinishGame(this.timer, this.random, this.sound);
    }
  }
  isFinish(): boolean {
    return false;
  }
}