interface IGame {
  play(): void;
  next(): IGame;
  isFinish(): boolean;
}
