import Description from './Description/Description';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Notification from './Notification/Notification';
import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(() => {
    const savedFeedback = window.localStorage.getItem('savedFeedback');
    if (savedFeedback !== null) {
      return JSON.parse(savedFeedback);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  useEffect(() => {
    window.localStorage.setItem('savedFeedback', JSON.stringify(count));
  }, [count]);

  const updateFeedback = feedbackType => {
    setCount(prevCount => ({
      ...prevCount,
      [feedbackType]: prevCount[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setCount({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = count.good + count.neutral + count.bad;
  const positiveFeedback = Math.round((count.good / totalFeedback) * 100);

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          values={{
            good: count.good,
            neutral: count.neutral,
            bad: count.bad,
            total: totalFeedback,
            positive: positiveFeedback,
          }}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
