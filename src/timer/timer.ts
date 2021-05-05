import ITimer from './ITimer';
import { performance } from 'perf_hooks';

export default class Timer implements ITimer {
  constructor() { }
  wait(sec: number): void {
    const msStart: number = performance.now();
    const msEnd: number = msStart + sec * 1000;
    while (performance.now() < msEnd);
  }
}
