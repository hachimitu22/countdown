import Countdown from './countdown';

const countdown = new Countdown();
countdown.execute()
  .catch(err => {
    console.log(err);
  });
