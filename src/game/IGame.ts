export default interface IGame {
  play(): Promise<void>;
  isClear(): boolean;
}
