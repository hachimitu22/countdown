import * as chai from 'chai';
import Sound from '../src/sound/sound';

describe('Sound', () => {
  it('音声が再生される', (done) => {
    const sound = new Sound('./voice');
    sound.play('1.wav')
      .then(() => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
