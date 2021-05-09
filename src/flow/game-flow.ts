import FinishChapter from "../chapter/finish-chapter";
import IChapter from "../chapter/IChapter";
import NormalChapter from "../chapter/normal-chapter";
import SpurtChapter from "../chapter/spurt-chapter";
import StopChapter from "../chapter/stop-chapter";
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
  firstChapter(): IChapter {
    return new NormalChapter(10, this.timer, this.random, this.sound);
  }
  nextChapter(currentGame: IChapter): IChapter {
    if (!currentGame.isClear()) {
      return currentGame;
    }

    const rand: number = this.random.lot(1, 100);

    if (currentGame instanceof NormalChapter) {
      if (rand <= 60) {
        return new StopChapter(this.timer, this.random, this.sound);
      } else if (rand <= 95) {
        return new SpurtChapter(9, this.timer, this.random, this.sound);
      } else {
        return new FinishChapter(this.timer, this.random, this.sound);
      }
    } else if (currentGame instanceof SpurtChapter) {
      if (rand <= 90) {
        return new StopChapter(this.timer, this.random, this.sound);
      } else {
        return new FinishChapter(this.timer, this.random, this.sound);
      }
    } else if (currentGame instanceof StopChapter) {
      return new NormalChapter(10, this.timer, this.random, this.sound);
    } else if (currentGame instanceof FinishChapter) {
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