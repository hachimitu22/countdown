import IRandom from "../random/IRandom";
import ISound from "../sound/ISound";
import ITimer from "../timer/ITimer";
import FastChapter from "./fast-chapter";
import FinishChapter from "./finish-chapter";
import HoldChapter from "./hold-chapter";
import IChapter from "./IChapter";
import NormalChapter from "./normal-chapter";
import SkipChapter from "./skip-chapter";
import SlowChapter from "./slow-chapter";
import SpurtChapter from "./spurt-chapter";
import StopChapter from "./stop-chapter";


export default class ChapterFactory {
  constructor(
    private timer: ITimer,
    private random: IRandom,
    private sound: ISound,
  ) { }
  create(chapterName: string): IChapter {
    switch (chapterName) {
      case NormalChapter.name:
        return new NormalChapter(10, this.timer, this.random, this.sound);
      case SpurtChapter.name:
        return new SpurtChapter(9, this.timer, this.random, this.sound);
      case FastChapter.name:
        return new FastChapter(10, this.timer, this.random, this.sound);
      case SlowChapter.name:
        return new SlowChapter(10, this.timer, this.random, this.sound);
      case SkipChapter.name:
        return new SkipChapter(10, this.timer, this.random, this.sound);
      case StopChapter.name:
        return new StopChapter(this.timer, this.random, this.sound);
      case HoldChapter.name:
        return new HoldChapter(this.timer, this.random, this.sound);
      case FinishChapter.name:
        return new FinishChapter(this.timer, this.random, this.sound);
    }

    throw new Error(`${chapterName} does not exist.`);
  }
}