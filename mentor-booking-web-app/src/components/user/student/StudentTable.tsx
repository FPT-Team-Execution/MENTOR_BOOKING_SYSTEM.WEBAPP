import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, message, Popconfirm } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

interface Student {
  fullname: string;
  email: string;
  university: string;
  major: string;
  walletPoint: number;
}

const studentData: Student[] = [
  {
    fullname: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    university: 'FPT University',
    major: 'Computer Science',
    walletPoint: 100,
  },
  {
    fullname: 'Bob Smith',
    email: 'bob.smith@example.com',
    university: 'Hanoi University',
    major: 'Information Technology',
    walletPoint: 80,
  },
  {
    fullname: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    university: 'HCM University',
    major: 'Software Engineering',
    walletPoint: 120,
  },
  {
    fullname: 'David Wilson',
    email: 'david.wilson@example.com',
    university: 'Danang University',
    major: 'Cybersecurity',
    walletPoint: 90,
  },
  {
    fullname: 'Eve Adams',
    email: 'eve.adams@example.com',
    university: 'FPT University',
    major: 'Data Science',
    walletPoint: 150,
  },
];

const StudentTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<Student[]>(studentData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(2); // Display 2 students per page

  // Functions for showing confirmation messages
  const handleEdit = (fullname: string) => {
    message.info(`Edit student: ${fullname}`);
  };

  const handleDelete = (fullname: string) => {
    message.success(`Deleted student: ${fullname}`);
  };

  const handleUpdatePoint = (fullname: string) => {
    message.info(`Updated points for: ${fullname}`);
  };

  // Menu for the ellipsis dropdown
  const menu = (fullname: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEdit(fullname)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title={`Are you sure to delete ${fullname}?`}
          onConfirm={() => handleDelete(fullname)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleUpdatePoint(fullname)}>
        Update Point
      </Menu.Item>
    </Menu>
  );

  // Change page handler
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // Paginate the student data
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Define columns for the table
  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'University',
      dataIndex: 'university',
      key: 'university',
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Wallet Point',
      dataIndex: 'walletPoint',
      key: 'walletPoint',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: { fullname: string }) => (
        <Dropdown overlay={menu(record.fullname)} trigger={['hover']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={paginatedData}
        columns={columns}
        rowKey="fullname"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data.length,
          onChange: handleChangePage,
          showSizeChanger: false, // Disable changing page size
        }}
        bordered
      />
    </div>
  );
};

export default StudentTable;
