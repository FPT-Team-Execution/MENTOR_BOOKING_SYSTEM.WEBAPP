import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import moment from 'moment';


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

interface FeedbackItem {
  username: string;
  message: string;
  createdBy: string;
  time: string;
}

interface PaginationData {
  totalItems: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

const paginationInfo: PaginationData = {
  totalItems: feedbackData.length,
  pageIndex: 1, 
  pageSize: 2, 
  totalPages: Math.ceil(feedbackData.length / 2),
};

const FeedbackTable: React.FC = () => {
  const [data, setData] = useState<FeedbackItem[]>(feedbackData);
  const [currentPage, setCurrentPage] = useState(paginationInfo.pageIndex);
  const [pageSize] = useState(paginationInfo.pageSize);

  const handleDelete = (username: string) => {
    const newData = data.filter((item) => item.username !== username);
    setData(newData);
    message.success(`Deleted feedback from ${username}`);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (time: string) => moment(time).fromNow(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: { username: string }) => (
        <Popconfirm
          title={`Are you sure you want to delete feedback from ${record.username}?`}
          onConfirm={() => handleDelete(record.username)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="username"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: paginationInfo.totalItems,
          onChange: handleChangePage,
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
};

export default FeedbackTable;
