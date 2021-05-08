import IGame from './game/IGame';
import Timer from './timer/timer';
import Random from './random/random';
import Sound from './sound/sound';
import GameFlow from './flow/game-flow';

export default class Countdown {
  constructor() { }
  async execute(): Promise<void> {
    try {
      const flow: GameFlow = new GameFlow(
        new Timer(),
        new Random(),
        new Sound('./voice/'),
      );
      let game: IGame = flow.firstGame();

      while (!flow.isFinish()) {
        await game.play();
        game = flow.nextGame(game);
      }
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
