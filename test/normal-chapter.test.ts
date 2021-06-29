import * as chai from 'chai';
import NormalChapter from '../src/frontend/chapter/normal-chapter';
import NotTimer from './not-timer';
import FixRandom from './fix-random';
import NotSound from './not-sound';

describe('NormalChanter', () => {
  it('10から0までカウントダウンするとクリアとなる', async () => {
    const timer :NotTimer = new NotTimer();
    const random :FixRandom = new FixRandom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const sound :NotSound = new NotSound();
    const game = new NormalChapter(10, timer, random, sound);

    chai.expect(game.isClear()).to.equal(false);

    try {
      // count 10 -> 1
      for (let i = 0; i < 9; i++){
        await game.play();
        chai.expect(game.isClear()).to.equal(false);
      }
      // count 1 -> 0
      await game.play();
      chai.expect(game.isClear()).to.equal(true);

      chai.assert.deepEqual(
        sound.histories,
        [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(v => `${v}.wav`)
      );
      chai.assert.deepEqual(
        timer.histories,
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(v => v.toString())
      );
    } catch (err) {
      throw err;
    }
  });
});
