const timer = (deadline) => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  const getTimeRemaining = () => {
    let dateStop = new Date(deadline).getTime();
    let dateNow = new Date().getTime();

    let timeRemaining = (dateStop - dateNow) / 1000;
    let hours = Math.floor(timeRemaining / 60 / 60);
    let minutes = Math.floor((timeRemaining / 60) % 60);
    let seconds = Math.floor(timeRemaining % 60);

    return { timeRemaining, hours, minutes, seconds};
  }

  let intervalId;

  const updateClock = () => {
    // console.log('tick'); // должно печататься 1 раз в 1000ms

    const t = getTimeRemaining();

    if (t.timeRemaining <= 0) {
      timerHours.textContent = 0;
      timerMinutes.textContent = 0;
      timerSeconds.textContent = 0;
      clearInterval(intervalId);
      return;
    }

    timerHours.textContent = t.hours;
    timerMinutes.textContent = t.minutes;
    timerSeconds.textContent = t.seconds;
  };

  updateClock(); // первый вызов сразу, без ожидания 1 секунды
  intervalId = setInterval(updateClock, 1000);
 }

 export default timer;