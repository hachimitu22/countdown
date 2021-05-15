import FastChapter from "../chapter/fast-chapter";
import FinishChapter from "../chapter/finish-chapter";
import HoldChapter from "../chapter/hold-chapter";
import IChapter from "../chapter/IChapter";
import NormalChapter from "../chapter/normal-chapter";
import SkipChapter from "../chapter/skip-chapter";
import SlowChapter from "../chapter/slow-chapter";
import SpurtChapter from "../chapter/spurt-chapter";
import StopChapter from "../chapter/stop-chapter";
import IRandom from "../random/IRandom";
import RatioTable from "../ratio/ratio-table";
import { ChapterRatioMap } from "../ratio/chapter-ratio-map"
import ISound from "../sound/ISound";
import ITimer from "../timer/ITimer";

export default class GameFlow {
  private finished: boolean = false;
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound,
    private ratioTable: ChapterRatioMap,
  ) { }
  firstChapter(): IChapter {
    return new NormalChapter(10, this.timer, this.random, this.sound);
  }
  nextChapter(currentGame: IChapter): IChapter {
    if (!currentGame.isClear()) {
      return currentGame;
    }

    const table: RatioTable<string> | undefined = this.ratioTable.get(currentGame.constructor.name);
    if (table === undefined) {
      throw new Error(`${currentGame.constructor.name} ratio table not exist`);
    }

    const nextChapterName: string = table.lot(this.random);

    switch (nextChapterName) {
      case NormalChapter.name:
        return new NormalChapter(10, this.timer, this.random, this.sound);
      case SpurtChapter.name:
        return new SpurtChapter(9, this.timer, this.random, this.sound);
      case StopChapter.name:
        return new StopChapter(this.timer, this.random, this.sound);
      case FinishChapter.name:
        return new FinishChapter(this.timer, this.random, this.sound);
    }

    throw new Error('not exist flow.');
  }
  isFinish(): boolean {
    return this.finished;
  }
}