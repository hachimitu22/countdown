import FinishGame from "../game/finish-game";
import IGame from "../game/IGame";
import NormalGame from "../game/normal-game";
import SpurtGame from "../game/spurt-game";
import StopGame from "../game/stop-game";
import IRandom from "../random/IRandom";
import ISound from "../sound/ISound";
import ITimer from "../timer/ITimer";

export default class GameFlow {
  private finished: boolean = false;
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound
  ) { }
  firstGame(): IGame {
    return new NormalGame(10, this.timer, this.random, this.sound);
  }
  nextGame(currentGame: IGame): IGame {
    if (!currentGame.isClear()) {
      return currentGame;
    }

    const rand: number = this.random.lot(1, 100);

    if (currentGame instanceof NormalGame) {
      if (rand <= 60) {
        return new StopGame(this.timer, this.random, this.sound);
      } else if (rand <= 95) {
        return new SpurtGame(9, this.timer, this.random, this.sound);
      } else {
        return new FinishGame(this.timer, this.random, this.sound);
      }
    } else if (currentGame instanceof SpurtGame) {
      if (rand <= 90) {
        return new StopGame(this.timer, this.random, this.sound);
      } else {
        return new FinishGame(this.timer, this.random, this.sound);
      }
    } else if (currentGame instanceof StopGame) {
      return new NormalGame(10, this.timer, this.random, this.sound);
    } else if (currentGame instanceof FinishGame) {
      this.finished = true;
      return currentGame;
    } else {
      throw new Error('not exist flow.');
    }
  }
  isFinish(): boolean {
    return this.finished;
  }
}