import * as chai from 'chai';
import GameFlow from '../src/flow/game-flow';
import IChapter from '../src/chapter/IChapter';
import NormalChapter from '../src/chapter/normal-chapter';
import StopChapter from '../src/chapter/stop-chapter';
import FixRandom from './fix-random';
import NotSound from './not-sound';
import NotTimer from './not-timer';
import { chapterRatioMap } from '../src/ratio/chapter-ratio-map';

describe('GameFlow', () => {
  it('NormalChapterからStopChapterへ遷移する', async () => {
    const timer: NotTimer = new NotTimer();
    const random: FixRandom = new FixRandom([]);
    const sound: NotSound = new NotSound();
    const flow: GameFlow = new GameFlow(
      timer,
      random,
      sound,
      chapterRatioMap,
    );

    const firstChapter: IChapter = flow.firstChapter();
    chai.expect(firstChapter).to.instanceOf(NormalChapter);

    try {
      // 10 -> 1
      for (let i = 0; i < 9; i++){
        random.add(1);
        await firstChapter.play();
      }
      chai.expect(flow.nextChapter(firstChapter)).to.instanceOf(NormalChapter);

      // 1 -> 0
      random.add(1);
      await firstChapter.play();

      // next chapter
      random.add(85);
      const secondChapter = flow.nextChapter(firstChapter)
      chai.expect(flow.nextChapter(secondChapter)).to.instanceOf(StopChapter);
    } catch (err) {
      throw err;
    }
  });
});
