import * as chai from 'chai';
import NotTimer from './not-timer';

describe('NotTimer', () => {
  it('waitを呼び出さないので履歴が存在しない', () => {
    const timer = new NotTimer();
    chai.assert.deepEqual(timer.histories, []);
  });
  it('waitを1回呼び出し履歴が1つ存在する', () => {
    const timer = new NotTimer();
    timer.wait(10);
    chai.assert.deepEqual(timer.histories, [10]);
  });
});
