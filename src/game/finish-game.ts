import IGame from './IGame';
import BaseGame from './base-game';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default class FinishGame extends BaseGame {
  constructor(
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
  }
  play(): void {
    this.sound.play(`0.wav`);
  }
  next(): IGame {
    return this;
  }
  isFinish(): boolean {
    return true;
  }
}
