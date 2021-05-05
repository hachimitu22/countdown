import IGame from './game/IGame';
import NormalGame from './game/normal-game';
import Timer from './timer/timer';
import Random from './random/random';
import Sound from './sound/sound';

export default class Countdown {
  private game: IGame;
  constructor() {
    this.game = new NormalGame(
      10,
      new Timer(),
      new Random(),
      new Sound('./voice/'),
    );
  }
  async execute(): Promise<void> {
    try {
      while (!this.game.isFinish()) {
        await this.game.play();
        this.game = this.game.next();
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
