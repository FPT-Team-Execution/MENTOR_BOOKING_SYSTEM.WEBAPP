import React from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { StudentType } from '../../../types/user.types';
import { useAuth } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import { projectService } from '../../../services/projectService';

interface StudentTableProps {
  students?: StudentType[];
  handleGetProject: () => void; // New prop for refreshing projects
}

const StudentProjectList: React.FC<StudentTableProps> = ({ students, handleGetProject }) => {
  const { userInfo } = useAuth();
  const { id } = useParams<{ id: string }>();

  const handleDeleteStudent = async (studentId: string) => {
    console.log(studentId, id);
    try {
      if (id) {
        await projectService.deleteStudentFromProject(studentId, id);
        message.success('Student deleted successfully');
        handleGetProject(); // Refresh project list
      }
    } catch {
      message.error('Failed to delete student');
    }
  };

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
    ...(userInfo?.role === 'Admin'
      ? [
          {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: StudentType) => (
              <Popconfirm
                title="Are you sure you want to delete this student?"
                onConfirm={() => handleDeleteStudent(record.studentId)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
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
