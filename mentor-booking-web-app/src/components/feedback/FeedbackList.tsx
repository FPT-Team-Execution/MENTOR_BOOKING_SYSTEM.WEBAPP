import React from 'react';
import FeedbackCard from './FeedbackCard';

const feedbackData = [
    {
      username: 'Alice',
      message: 'Great service, really enjoyed my experience!',
      createdBy: 'Admin',
      time: '2024-10-01T12:30:00Z',
    },
    {
      username: 'Bob',
      message: 'The product quality could be improved.',
      createdBy: 'User',
      time: '2024-10-02T09:15:00Z',
    },
    {
      username: 'Charlie',
      message: 'Excellent support from the team!',
      createdBy: 'Admin',
      time: '2024-10-03T15:45:00Z',
    },
    {
      username: 'David',
      message: 'Had some issues with the checkout process.',
      createdBy: 'User',
      time: '2024-10-04T10:00:00Z',
    },
    {
      username: 'Eve',
      message: 'I love the new features added to the app!',
      createdBy: 'Admin',
      time: '2024-10-05T14:20:00Z',
    },
  ];

const FeedbackList: React.FC = () => {
  return (
    <div className="p-4">
      {feedbackData.map((feedback, index) => (
        <FeedbackCard
          key={index}
          username={feedback.username}
          message={feedback.message}
          createdBy={feedback.createdBy}
          time={feedback.time}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
