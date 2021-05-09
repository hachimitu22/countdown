export default interface IChapter {
  play(): Promise<void>;
  isClear(): boolean;
}
