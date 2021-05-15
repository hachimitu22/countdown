export default interface IChapter {
  play(): Promise<void>;
  stop(): void;
  isClear(): boolean;
}
