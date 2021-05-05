import IGame from './IGame';
import BaseGame from './base-game';
import NormalGame from './normal-game';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class StopGame extends BaseGame {
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
        const waitSec = this.random.lot(5, 10);
        this.timer.wait(waitSec);
        return Promise.resolve();
      });
  }
  next(): IGame {
    return new NormalGame(10, this.timer, this.random, this.sound);
  }
  isFinish(): boolean {
    return false;
  }
}
