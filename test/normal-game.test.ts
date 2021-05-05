import * as chai from 'chai';
import IGame from '../src/game/IGame';
import NormalGame from '../src/game/normal-game';
import StopGame from '../src/game/stop-game';
import SpurtGame from '../src/game/spurt-game';
import FinishGame from '../src/game/finish-game';
import NotTimer from './not-timer';
import FixRandom from './fix-random';
import NotSound from './not-sound';

describe('NormalGame', () => {
  it('10から1までカウントダウンする', (done) => {
    const timer :NotTimer = new NotTimer();
    const random :FixRandom = new FixRandom([]);
    const sound :NotSound = new NotSound();
    const game = new NormalGame(
      10,
      timer,
      random,
      sound,
    );

    // count 10
    random.add(1);
    game.play()
      .then(() => {
        game.next();
        // count 9
        random.add(2);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 8
        random.add(3);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 7
        random.add(4);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 6
        random.add(5);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 5
        random.add(6);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 4
        random.add(7);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 3
        random.add(8);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 2
        random.add(9);
        return game.play();
      })
      .then(() => {
        game.next();
        // count 1
        random.add(10);
        return game.play();
      })
      .then(() => {
        chai.assert.deepEqual(
          sound.histories,
          [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(v => `${v}.wav`)
        );
        chai.assert.deepEqual(
          timer.histories,
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        );
        done();
      })
      .catch(done);
  });
  it('1からカウントダウンしてStopGameへ移行する', () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const game = new NormalGame(
      1,
      timer,
      random,
      sound,
    );

    random.add(10);
    const nextGame: IGame = game.next();
    chai.expect(nextGame).to.instanceOf(StopGame);
  });
  it('1からカウントダウンしてSpurtGameへ移行する', () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const game = new NormalGame(
      1,
      timer,
      random,
      sound,
    );

    random.add(70);
    const nextGame: IGame = game.next();
    chai.expect(nextGame).to.instanceOf(SpurtGame);
  });
  it('1からカウントダウンしてFinishGameへ移行する', () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const game = new NormalGame(
      1,
      timer,
      random,
      sound,
    );

    random.add(99);
    const nextGame: IGame = game.next();
    chai.expect(nextGame).to.instanceOf(FinishGame);
  });
});
