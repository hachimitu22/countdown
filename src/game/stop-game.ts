class StopGame extends BaseGame {
  constructor(
    timer: ITimer,
    random: IRandom,
    sound: ISound
  ) {
    super(timer, random, sound);
  }
  play(): void {
    this.sound.play(`./voice/stop.wav`);
  }
  next(): IGame {
    return new NormalGame(10, this.timer, this.random, this.sound);
  }
  isFinish(): boolean {
    return false;
  }
}
