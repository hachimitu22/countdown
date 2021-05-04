class Timer implements ITimer {
  constructor() { }
  wait(sec: number): void {
    const startSec = (new Date()).getSeconds();
    const endSec = startSec + sec;
    while ((new Date()).getSeconds() < endSec);
  }
}
