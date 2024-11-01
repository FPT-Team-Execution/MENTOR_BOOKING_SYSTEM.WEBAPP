/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Menu, message, Popconfirm, Modal, Input, Button, Select } from 'antd';
import { studentService } from '../../../services/studentService';
import { StudentType } from '../../../types/user.types';

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
    setAmount(0); // Reset amount
    setTransactionType('Credit'); // Default value for transaction type
    setKind('Personal'); // Default value for kind
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedStudent) {
      try {
        const updatePayload = {
          studentId: selectedStudent.id,
          amount: amount, // adjust based on transaction type
          transactionType: transactionType,
          kind: kind,
        };
        await studentService.updateStudentPoint(updatePayload); // Assume this API call exists
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
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
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
        visible={isModalOpen}
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
    </div>
  );
};

export default StudentTable;
