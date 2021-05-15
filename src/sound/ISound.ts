export default interface ISound {
  play(path: string): Promise<void>;
  stop(): void;
}
