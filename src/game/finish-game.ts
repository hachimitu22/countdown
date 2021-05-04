class FinishGame extends BaseGame {
  constructor(
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
  }
  play(): void {
    this.sound.play(`./voice/0.wav`);
  }
  next(): IGame {
    return this;
  }
  isFinish(): boolean {
    return true;
  }
}
