import FinishChapter from "../chapter/finish-chapter";
import IChapter from "../chapter/IChapter";
import NormalChapter from "../chapter/normal-chapter";
import IRandom from "../random/IRandom";
import RatioTable from "../ratio/ratio-table";
import { ChapterRatioMap } from "../ratio/chapter-ratio-map"
import ISound from "../sound/ISound";
import ITimer from "../timer/ITimer";
import ChapterFactory from "../chapter/chapter-factory";

export default class GameFlow {
  private finished: boolean = false;
  private chapterFactory: ChapterFactory;
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound,
    private ratioTable: ChapterRatioMap,
  ) {
    this.chapterFactory = new ChapterFactory(this.timer, this.random, this.sound);
  }
  firstChapter(): IChapter {
    return this.chapterFactory.create(NormalChapter.name);
  }
  nextChapter(currentGame: IChapter): IChapter {
    if (!currentGame.isClear()) {
      return currentGame;
    }

    if(currentGame instanceof FinishChapter){
      this.finished = true;
      return currentGame;
    }

    const table: RatioTable<string> | undefined = this.ratioTable.get(currentGame.constructor.name);
    if (table === undefined) {
      throw new Error(`${currentGame.constructor.name} ratio table not exist`);
    }

    const nextChapterName: string = table.lot(this.random);

    return this.chapterFactory.create(nextChapterName);
  }
  isFinish(): boolean {
    return this.finished;
  }
}