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
      .then(done)
      .catch(done);
  }).timeout(5000);

  it('2つの音声が順番に再生される', (done) => {
    const sound = new Sound('./voice');

    sound.play('1.wav')
      .then(() => sound.play('2.wav'))
      .then(done)
      .catch(done);
  }).timeout(10000);
});
