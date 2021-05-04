class Countdown {
  private game: IGame;
  constructor() {
    this.game = new NormalGame(
      10,
      new Timer(),
      new Random(),
      new Sound(),
    );
  }
  execute(): void {
    while (!this.game.isFinish()) {
      this.game.play();
      this.game = this.game.next();
    }
  }
}
