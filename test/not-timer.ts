import ITimer from '../src/frontend/timer/ITimer';

export default class NotTimer implements ITimer {
  readonly histories: string[];
  constructor() {
    this.histories = [];
  }
  wait(sec: number): Promise<void> {
    this.histories.push(sec.toString());
    return Promise.resolve();
  }
  stop(): void {
    this.histories.push('stop');
  }
}
