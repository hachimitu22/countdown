import * as chai from 'chai';
import ChapterFactory from '../src/chapter/chapter-factory';
import NormalChapter from '../src/chapter/normal-chapter';
import Countdown from '../src/countdown';
import FixRandom from './fix-random';
import NotSound from './not-sound';
import NotTimer from './not-timer';

describe('ChapterFactory', () => {
  it('NormalChapterを指定して生成に成功する', () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const factory = new ChapterFactory(
      timer,
      random,
      sound,
    );

    chai.expect(factory.create('NormalChapter')).to.instanceOf(NormalChapter);
  });

  it('NoneChapterを指定して例外が発生する', () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const factory = new ChapterFactory(
      timer,
      random,
      sound,
    );

    chai.expect(() => factory.create('NoneChapter')).to.throw();
  });
});
