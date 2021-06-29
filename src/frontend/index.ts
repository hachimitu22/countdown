import Countdown from './countdown';
import Random from './random/random';
import AudioSound from './sound/audio-sound';
import Timer from './timer/timer';

window.onload = () => {
  const mainElement = document.getElementById('main');
  const audioElement = document.getElementById('voice');

  if (!mainElement) {
    console.log('not exist id main');
    return;
  }
  if (!audioElement) {
    console.log('not exist id voice');
    return;
  }
  if (!(audioElement instanceof HTMLAudioElement)) {
    console.log('id voice is not HTMLAudioElement');
    return;
  }

  mainElement.addEventListener('click', (() => {
    const start = () => {
      const countdown = new Countdown(
        new Timer(),
        new Random(),
        new AudioSound('./voice/', audioElement),
      );

      countdown.execute()
        .then(() => {
          countdown.gameOver();
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
        });

      mainElement.removeEventListener('click', start);

      const surrender = () => {
        countdown.surrender();
        mainElement.removeEventListener('click', surrender);
        mainElement.addEventListener('click', start);
      };
      mainElement.addEventListener('click', surrender);
    };

    return start;
  })());

};
