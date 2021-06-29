import * as chai from 'chai';
import Timer from '../src/frontend/timer/timer';
import { performance } from 'perf_hooks';

describe('Timer', () => {
  it('1秒待機していること', async () => {
    const timer = new Timer();

    const msStart: number = performance.now();
    await timer.wait(1);
    const msEnd: number = performance.now();
    chai.expect(msEnd - msStart).to.greaterThanOrEqual(1000);
  }).timeout(5000);
  it('3秒待機が中断すること', async () => {
    const timer = new Timer();

    const msStart: number = performance.now();
    await Promise.all([
      timer.wait(3),
      new Promise<void>((resolve, reject) => {
        timer.stop();
        resolve();
      }),
    ]);
    const msEnd: number = performance.now();
    chai.expect(msEnd - msStart).to.lessThanOrEqual(3000);
  }).timeout(5000);
});
