import * as chai from 'chai';
import Countdown from '../src/countdown';
import FixRandom from './fix-random';
import NotSound from './not-sound';
import NotTimer from './not-timer';

describe.only('Countdown', () => {
  it('ゲームが実行完了する', async () => {
    const randValues: number[] = (new Array(100)).fill(100);
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom(randValues);
    const sound: NotSound = new NotSound();
    const countdown: Countdown = new Countdown(
      timer,
      random,
      sound,
    );

    try {
      await countdown.execute();
    } catch (err) {
      throw err;
    }
  });
});
