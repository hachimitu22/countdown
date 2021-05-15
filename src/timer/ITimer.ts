export default interface ITimer {
  wait(sec: number): void;
  stop(): void;
}
