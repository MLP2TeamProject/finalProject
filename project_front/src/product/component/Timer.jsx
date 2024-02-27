import { useState, useEffect } from "react";

const Timer = ({ endtime }) => {
  const [countTime, setCountTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const currentDate = new Date();
      const endDate = new Date(endtime);
      const timeRemaining = endDate - currentDate;
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); //1초 1000밀리초
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountTime({ days, hours, minutes, seconds });
    };

    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [endtime]);

  return (
    <div>
      <div id="timer">
        <div>
          {countTime.days}
          <span>Days</span>
        </div>
        <div>
          {countTime.hours}
          <span>Hours</span>
        </div>
        <div>
          {countTime.minutes}
          <span>Minutes</span>
        </div>
        <div>
          {countTime.seconds}
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
