import ISound from "./ISound";

export default class AudioSound implements ISound {
  private directory: string;
  constructor(directory: string, private audioElement: HTMLAudioElement) {
    this.directory = directory;
    if (directory.charAt(directory.length - 1) !== '/') {
      this.directory += '/';
    }
  }
  play(filename: string): Promise<void> {
    const path: string = this.directory + filename;
    return new Promise((resolve, reject) => {
      this.audioElement.src = path;
      this.audioElement.load();
      this.audioElement.play();
      resolve();
    });
  }
  stop(): void {
    this.audioElement.pause();
  }
}
