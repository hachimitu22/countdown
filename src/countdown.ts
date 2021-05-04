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
      new Sound('../voice/'),
    );
  }
  execute(): void {
    while (!this.game.isFinish()) {
      this.game.play();
      this.game = this.game.next();
    }
  }
}
