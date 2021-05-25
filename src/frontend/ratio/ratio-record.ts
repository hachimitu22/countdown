export default class RatioRecord<T> {
  constructor(
    readonly value: T,
    readonly ratio: number
  ) { }
}