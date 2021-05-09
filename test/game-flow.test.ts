import * as chai from 'chai';
import GameFlow from '../src/flow/game-flow';
import IChapter from '../src/chapter/IChapter';
import NormalChapter from '../src/chapter/normal-chapter';
import StopChapter from '../src/chapter/stop-chapter';
import FixRandom from './fix-random';
import NotSound from './not-sound';
import NotTimer from './not-timer';

describe('GameFlow', () => {
  it('NormalChapterからStopChapterへ遷移する', async () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const flow: GameFlow = new GameFlow(
      timer,
      random,
      sound,
    );

    const game: IChapter = flow.firstChapter();
    chai.expect(game).to.instanceOf(NormalChapter);

    try {
      for (let i = 0; i < 9; i++){
        random.add(1);
        await game.play();
      }
      random.add(1);
      chai.expect(flow.nextChapter(game)).to.instanceOf(NormalChapter);

      random.add(1);
      await game.play();
      random.add(1);
      chai.expect(flow.nextChapter(game)).to.instanceOf(StopChapter);
    } catch (err) {
      throw err;
    }
  });
});
