import ITimer from './ITimer';

export default class Timer implements ITimer {
  private waiting: boolean = false;
  constructor() { }
  wait(sec: number): Promise<void> {
    this.waiting = true;
    let loopCount = sec * 10;

    return new Promise<void>((resolve, reject) => {
      const id = setInterval(() => {
        loopCount--;
        if (loopCount > 0 && this.waiting) {
          return;
        }
        clearInterval(id);
        resolve();
      }, 100);
    });
  }
  stop(): void {
    this.waiting = false;
  }
}
