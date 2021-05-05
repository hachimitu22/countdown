import IGame from './IGame';
import ITimer from '../timer/ITimer';
import IRandom from '../random/IRandom';
import ISound from '../sound/ISound';

export default abstract class BaseGame implements IGame {
  constructor(
    protected timer: ITimer,
    protected random: IRandom,
    protected sound: ISound,
  ) { }
  abstract play(): Promise<void>;
  abstract next(): IGame;
  abstract isFinish(): boolean;
}
