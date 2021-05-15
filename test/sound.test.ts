import * as chai from 'chai';
import Sound from '../src/sound/sound';

describe('Sound', () => {
  it('音声が再生される', (done) => {
    const sound = new Sound('./voice');
    sound.play('1.wav')
      .then(done)
      .catch(done);
  }).timeout(5000);

  it('2つの音声が同時に再生される', (done) => {
    const sound = new Sound('./voice');

    Promise.all([
      sound.play('1.wav'),
      sound.play('2.wav'),
    ])
      .then(() => done())
      .catch(done);
  }).timeout(5000);

  it('音声が中断される', (done) => {
    const sound = new Sound('./voice');
    sound.play('finish.wav')
      .then(() => {
        return new Promise((resolve) => setTimeout(resolve, 500));
      })
      .then(() => {
        sound.stop();
        done();
      })
      .catch(done);
  }).timeout(5000);
});
