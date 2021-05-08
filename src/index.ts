import Countdown from './countdown';
import Random from './random/random';
import Sound from './sound/sound';
import Timer from './timer/timer';

const countdown = new Countdown(
  new Timer(),
  new Random(),
  new Sound('./voice/'),
);
countdown.execute()
  .catch(err => {
    console.log(err);
  });
