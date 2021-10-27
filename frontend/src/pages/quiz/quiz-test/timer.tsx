import React, { useState, useEffect } from "react";
import { useAppSelector } from "src/redux/hooks";
import { store } from "src/redux/store";
import { changeTimer } from "src/redux/quiz/quiz-slice";
import { timeFormatter } from "src/utils/helpers";

export const Timer: React.FC = () => {
  const { quizTimer } = useAppSelector((state) => state.quiz);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const increaseTimer = () => {
    let _seconds = seconds;
    let _minutes = minutes;
    let _hours = hours;

    if (_seconds < 59) {
      setSeconds(_seconds + 1);
      _seconds += 1;
    } else {
      setSeconds(0);
      _seconds = 0;
    }

    if (_seconds === 0) {
      if (_minutes < 59) {
        setMinutes(_minutes + 1);
        _minutes += 1;
      } else {
        setMinutes(0);
        setHours(_hours + 1);
        _minutes = 0;
        _hours += 1;
      }
    }

    const time = timeFormatter(_seconds, _minutes, _hours);
    store.dispatch(changeTimer(time));
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      increaseTimer();
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <h2 data-testid="quiz-timer">{quizTimer}</h2>;
};
