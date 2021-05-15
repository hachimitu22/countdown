import RatioRecord from "../ratio/ratio-record";
import RatioTable from "../ratio/ratio-table";
import NormalChapter from "../chapter/normal-chapter";
import SpurtChapter from "../chapter/spurt-chapter";
import FastChapter from "../chapter/fast-chapter";
import SlowChapter from "../chapter/slow-chapter";
import SkipChapter from "../chapter/skip-chapter";
import StopChapter from "../chapter/stop-chapter";
import HoldChapter from "../chapter/hold-chapter";
import FinishChapter from "../chapter/finish-chapter";

export type ChapterRatioMap = Map<string, RatioTable<string>>;

export const chapterRatioMap: ChapterRatioMap = new Map<string, RatioTable<string>>([
  [NormalChapter.name, new RatioTable<string>([
    new RatioRecord<string>(SpurtChapter.name, 35),
    new RatioRecord<string>(StopChapter.name, 50),
    new RatioRecord<string>(HoldChapter.name, 10),
    new RatioRecord<string>(FinishChapter.name, 5),
  ])],
  [SpurtChapter.name, new RatioTable<string>([
    new RatioRecord<string>(StopChapter.name, 60),
    new RatioRecord<string>(HoldChapter.name, 30),
    new RatioRecord<string>(FinishChapter.name, 10),
  ])],
  [FastChapter.name, new RatioTable<string>([
    new RatioRecord<string>(SpurtChapter.name, 35),
    new RatioRecord<string>(StopChapter.name, 50),
    new RatioRecord<string>(HoldChapter.name, 10),
    new RatioRecord<string>(FinishChapter.name, 5),
  ])],
  [SlowChapter.name, new RatioTable<string>([
    new RatioRecord<string>(SpurtChapter.name, 35),
    new RatioRecord<string>(StopChapter.name, 50),
    new RatioRecord<string>(HoldChapter.name, 10),
    new RatioRecord<string>(FinishChapter.name, 5),
  ])],
  [SkipChapter.name, new RatioTable<string>([
    new RatioRecord<string>(SpurtChapter.name, 35),
    new RatioRecord<string>(StopChapter.name, 50),
    new RatioRecord<string>(HoldChapter.name, 10),
    new RatioRecord<string>(FinishChapter.name, 5),
  ])],
  [StopChapter.name, new RatioTable<string>([
    new RatioRecord<string>(NormalChapter.name, 70),
    new RatioRecord<string>(FastChapter.name, 10),
    new RatioRecord<string>(SlowChapter.name, 10),
    new RatioRecord<string>(SkipChapter.name, 10),
  ])],
  [HoldChapter.name, new RatioTable<string>([
    new RatioRecord<string>(StopChapter.name, 90),
    new RatioRecord<string>(FinishChapter.name, 10),
  ])],
  [FinishChapter.name, new RatioTable<string>([
    new RatioRecord<string>(FinishChapter.name, 100),
  ])],
]);
