import ISound from '../src/frontend/sound/ISound';

export default class NotSound implements ISound {
  readonly histories: string[];
  constructor() {
    this.histories = [];
  }
  play(filename: string): Promise<void> {
    this.histories.push(filename);
    return Promise.resolve();
  }
  stop(): void {
    this.histories.push('stop');
  }
}
