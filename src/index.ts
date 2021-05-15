import Countdown from './countdown';
import Random from './random/random';
import Sound from './sound/sound';
import Timer from './timer/timer';
import readline from 'readline';

const countdown = new Countdown(
  new Timer(),
  new Random(),
  new Sound('./voice/'),
);
const input = readline.createInterface(process.stdin, process.stdout);

countdown.execute()
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    input.close();
  });

input.once('line', (_) => {
  input.close();
  countdown.surrender();
  console.log('surrender');
});
