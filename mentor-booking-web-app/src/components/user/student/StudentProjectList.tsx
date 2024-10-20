import React from 'react';
import { Table } from 'antd';
import { StudentType } from '../../../types/user.types';


interface StudentTableProps {
  students?: StudentType[];
}

const StudentProjectList: React.FC<StudentTableProps> = ({ students }) => {
  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      key: 'fullName',
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
      title: 'Wallet Point',
      dataIndex: 'walletPoint',
      key: 'walletPoint',
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={students}
        rowKey="email"
        pagination={false}
      />
    </div>
  );
};

export default StudentProjectList;
