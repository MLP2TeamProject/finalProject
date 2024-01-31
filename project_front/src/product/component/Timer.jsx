import { useState, useEffect } from "react";

//assets => css => all.css 에 css 붙여놓음

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    futureDate.setHours(0, 0, 0, 0);
    // const futureDate = new Date("2024/02/08 00:00:00").getTime();
    //사용자에게 선택을 주면 이 부분을 바꿔야 함

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = futureDate - now;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <div id="timer">
        <div>
          {timeLeft.days}
          <span>Days</span>
        </div>
        <div>
          {timeLeft.hours}
          <span>Hours</span>
        </div>
        <div>
          {timeLeft.minutes}
          <span>Minutes</span>
        </div>
        <div>
          {timeLeft.seconds}
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};
export default Timer;
