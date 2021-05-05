import ITimer from '../src/timer/ITimer';

export default class NotTimer implements ITimer {
  readonly histories: number[];
  constructor() {
    this.histories = [];
  }
  wait(sec: number): void{
    this.histories.push(sec);
    return;
  }
}
