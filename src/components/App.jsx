import { useState } from 'react';

import { FeedbackOptions } from './FeedbackOptions';
import { Statistics } from './Statistics';
import { Section } from './Section';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function countTotalFeedback() {
    return [good, neutral, bad].reduce((total, el) => {
      return total + el;
    }, 0);
  }

  function countPositiveFeedbackPercentage() {
    const percentage = (good / countTotalFeedback()) * 100;

    return Math.floor(percentage);
  }

  const handleFeedback = type => {
    switch (type) {
      case 'good':
        setGood(prev => prev + 1);
        break;

      case 'neutral':
        setNeutral(prev => prev + 1);
        break;

      case 'bad':
        setBad(prev => prev + 1);
        break;

      default:
        return;
    }
  };

  const totalFeedback = countTotalFeedback();
  const options = ['good', 'neutral', 'bad'];

  return (
    <div className="feedback-app">
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {totalFeedback !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <p className="title">There's no feedback yet</p>
        )}
      </Section>
    </div>
  );
};
