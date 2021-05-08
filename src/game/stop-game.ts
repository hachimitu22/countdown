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
        this.cleared = true;

        return Promise.resolve();
      });
  }
  isClear(): boolean {
    return this.cleared;
  }
}
