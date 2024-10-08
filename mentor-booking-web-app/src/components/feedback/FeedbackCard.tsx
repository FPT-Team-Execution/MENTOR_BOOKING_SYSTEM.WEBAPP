import React from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import moment from "moment";

const { Title, Text } = Typography;

interface FeedbackCardProps {
  username: string;
  message: string;
  createdBy: string;
  time: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ username, message, createdBy, time }) => {
  return (
    <Card
      className="bg-white shadow-lg rounded-lg max-w-80"
      hoverable
      title={
        <div className="flex items-center">
          <UserOutlined className="text-indigo-600" />
          <Title level={4} className="ml-2 text-gray-800">
            {username}
          </Title>
        </div>
      }
    >
      <Text className="text-gray-600">{message}</Text>
      <div className="text-gray-500 text-sm">
        <p>
          Created by: <span className="text-indigo-500">{createdBy}</span>
        </p>
        <p className="flex items-center">
          <ClockCircleOutlined className="mr-1" />
          <Text>{moment(time).fromNow()}</Text>
        </p>
      </div>
    </Card>
  );
};

export default FeedbackCard;
