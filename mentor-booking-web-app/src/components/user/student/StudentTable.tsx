/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, message, Modal, Input, Button, Select, Popconfirm } from 'antd';
import { studentService } from '../../../services/studentService';
import { StudentType } from '../../../types/user.types';
import CreateStudent from './CreateStudent';

const { Option } = Select;

const StudentTable: React.FC = () => {
  const [data, setData] = useState<StudentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<string>('Credit');
  const [kind, setKind] = useState<string>('Personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    handleFetch();
  };

  useEffect(() => {
    handleFetch();
  }, [currentPage]);

  const handleFetch = async () => {
    try {
      const res = await studentService.getAllStudent(currentPage.toString(), pageSize.toString());
      if (res) {
        setData(res.items);
        setTotalItems(res.totalPages * pageSize);
        setCurrentPage(res.pageIndex);
      } else {
        console.log('Failed to fetch API');
      }
    } catch (err) {
      console.log("Failed to load students: " + err);
    }
  };

  const openUpdatePointModal = (student: StudentType) => {
    setSelectedStudent(student);
    setAmount(0);
    setTransactionType('Credit');
    setKind('Personal');
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedStudent) {
      try {
        const updatePayload = {
          studentId: selectedStudent.id,
          amount: amount,
          transactionType: transactionType,
          kind: kind,
        };
        await studentService.updateStudentPoint(updatePayload);
        message.success(`Updated points for ${selectedStudent.fullName}`);
        setIsModalOpen(false);
        handleFetch();
      } catch (err) {
        message.error("Failed to update points");
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLockStudent = async (student: StudentType) => {
    try {
      await studentService.updateStudent({...student, lockoutEnabled: true});
      message.success(`${student.fullName} has been locked`);
      handleFetch();
    } catch (err) {
      message.error("Failed to lock student");
    }
  };

  const handleUnlockStudent = async (student: StudentType) => {
    try {
      await studentService.updateStudent({...student, lockoutEnabled: false});
      message.success(`${student.fullName} has been unlocked`);
      handleFetch();
    } catch (err) {
      message.error("Failed to unlock student");
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
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
    {
      title: 'Actions',
      key: 'actions',
      render: (record: StudentType) => (
        <div>
          <Button type="link" onClick={() => openUpdatePointModal(record)}>
            Update Point
          </Button>
          {record.lockoutEnabled ? (
            <Popconfirm
              title="Are you sure you want to unlock this student?"
              onConfirm={() => handleUnlockStudent(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" style={{ color: 'green' }}>
                Unlock
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Are you sure you want to lock this student?"
              onConfirm={() => handleLockStudent(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger>
                Lock
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button type="primary" onClick={openCreateModal} style={{ marginBottom: '16px' }}>
        Create Student
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: handleChangePage,
          showSizeChanger: false,
        }}
        bordered
      />

      <Modal
        title="Update Wallet Point"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div hidden>
          <label>Student ID:</label>
          <Input value={selectedStudent?.id} readOnly />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Amount:</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Transaction Type:</label>
          <Select
            value={transactionType}
            onChange={(value) => setTransactionType(value)}
            style={{ width: '100%' }}
          >
            <Option value="Credit">Credit</Option>
            <Option value="Debit">Debit</Option>
          </Select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Kind:</label>
          <Select
            value={kind}
            onChange={(value) => setKind(value)}
            style={{ width: '100%' }}
          >
            <Option value="Personal">Personal</Option>
            <Option value="Project">Project</Option>
          </Select>
        </div>
      </Modal>
      <Modal
        title="Create Student"
        open={isCreateModalOpen}
        onCancel={closeCreateModal}
        footer={null} // No footer to rely on form submission
      >
        <CreateStudent />
      </Modal>
    </div>
  );
};

export default StudentTable;
