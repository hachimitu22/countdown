import IChapter from './chapter/IChapter';
import GameFlow from './flow/game-flow';
import ITimer from './timer/ITimer';
import IRandom from './random/IRandom';
import ISound from './sound/ISound';
import { chapterRatioMap } from './ratio/chapter-ratio-map'

export default class Countdown {
  private surrendered: boolean = false;
  private flow: GameFlow;
  private chapter: IChapter;
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound
  ) {
    this.flow = new GameFlow(
      this.timer,
      this.random,
      this.sound,
      chapterRatioMap,
    );
    this.chapter = this.flow.firstChapter();
  }
  async execute(): Promise<void> {
    try {

      while (!this.flow.isFinish() && !this.surrendered) {
        await this.chapter.play();
        this.chapter = this.flow.nextChapter(this.chapter);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
  surrender(): void {
    this.surrendered = true;
    this.chapter.stop();
  }
  gameOver(): void {
    if(this.surrendered){
      this.sound.play('fail.wav');
    } else {
      this.sound.play('finish.wav');
    }
  }
}
