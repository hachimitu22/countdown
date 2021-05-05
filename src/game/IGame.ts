export default interface IGame {
  play(): Promise<void>;
  next(): IGame;
  isFinish(): boolean;
}
