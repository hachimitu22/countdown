import * as chai from 'chai';
import GameFlow from '../src/flow/game-flow';
import IGame from '../src/game/IGame';
import NormalGame from '../src/game/normal-game';
import StopGame from '../src/game/stop-game';
import FixRandom from './fix-random';
import NotSound from './not-sound';
import NotTimer from './not-timer';

describe('GameFlow', () => {
  it('NormalGameからStopGameへ遷移する', async () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const flow: GameFlow = new GameFlow(
      timer,
      random,
      sound,
    );

    const game: IGame = flow.firstGame();
    chai.expect(game).to.instanceOf(NormalGame);

    try {
      for (let i = 0; i < 9; i++){
        random.add(1);
        await game.play();
      }
      random.add(1);
      chai.expect(flow.nextGame(game)).to.instanceOf(NormalGame);

      random.add(1);
      await game.play();
      random.add(1);
      chai.expect(flow.nextGame(game)).to.instanceOf(StopGame);
    } catch (err) {
      throw err;
    }
  });
});
