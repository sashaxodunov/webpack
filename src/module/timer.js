const timer = (deadline) => {
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();

    // фикс: зажимаем в 0, если дедлайн уже прошёл
    const timeRemaining = Math.max(0, Math.floor((dateStop - dateNow) / 1000));

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return { timeRemaining, hours, minutes, seconds };
  };

  let intervalId;

  const updateClock = () => {

    const t = getTimeRemaining();

    timerHours.textContent = t.hours;
    timerMinutes.textContent = t.minutes;
    timerSeconds.textContent = t.seconds;

    if (t.timeRemaining === 0) {
      clearInterval(intervalId);
    }
  };

  updateClock();
  intervalId = setInterval(updateClock, 1000);
};

export default timer;
