import * as chai from 'chai';
import NotSound from './not-sound';

describe('NotSound', () => {
  it('playを呼び出さないので履歴が存在しない', () => {
    const sound = new NotSound();
    chai.assert.deepEqual(sound.histories, []);
  });
  it('playを1回呼び出し履歴が1つ存在する', (done) => {
    const sound = new NotSound();
    sound.play('test.wav')
      .then(() => {
        chai.assert.deepEqual(sound.histories, ['test.wav']);
        done();
      })
      .catch(done);
  });
  it('stopを1回呼び出し履歴に"stop"が1つ存在する', () => {
    const sound = new NotSound();
    sound.stop();
    chai.assert.deepEqual(sound.histories, ['stop']);
  });
});
