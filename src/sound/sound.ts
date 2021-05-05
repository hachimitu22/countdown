import player from 'node-wav-player';
import ISound from './ISound';

export default class Sound implements ISound {
  private directory: string;
  constructor(directory: string) {
    this.directory = directory;
    if (directory.charAt(directory.length - 1) !== '/') {
      this.directory += '/';
    }
  }
  play(filename: string): Promise<void> {
    const path: string = this.directory + filename;
    return player.play({
      path: path,
    });
  }
}