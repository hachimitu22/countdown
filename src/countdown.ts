import IChapter from './chapter/IChapter';
import GameFlow from './flow/game-flow';
import ITimer from './timer/ITimer';
import IRandom from './random/IRandom';
import ISound from './sound/ISound';
import { chapterRatioMap } from './ratio/chapter-ratio-map'

export default class Countdown {
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound
  ) { }
  async execute(): Promise<void> {
    try {
      const flow: GameFlow = new GameFlow(
        this.timer,
        this.random,
        this.sound,
        chapterRatioMap,
      );
      let game: IChapter = flow.firstChapter();

      while (!flow.isFinish()) {
        await game.play();
        game = flow.nextChapter(game);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
