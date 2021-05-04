class Random implements IRandom {
  constructor() { }
  lot(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
