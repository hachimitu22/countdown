import * as chai from 'chai';
import Timer from '../src/timer/timer';
import { performance } from 'perf_hooks';

describe('Timer', () => {
  it('1秒待機していること', () => {
    const timer = new Timer();

    const msStart: number = performance.now();
    timer.wait(1);
    const msEnd: number = performance.now();
    chai.expect(msEnd - msStart).to.greaterThanOrEqual(1000);
  }).timeout(5000);
});
