abstract class BaseGame implements IGame {
  constructor(
    protected timer: ITimer,
    protected random: IRandom,
    protected sound: ISound,
  ) { }
  abstract play(): void;
  abstract next(): IGame;
  abstract isFinish(): boolean;
}
