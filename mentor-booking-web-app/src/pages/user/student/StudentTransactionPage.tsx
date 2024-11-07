import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import { useAuth } from '../../../auth/AuthContext';
import { transactionService } from '../../../services/transactionService';
import { TransactionType } from '../../../types/transation.types';
import { ArrowUpOutlined } from '@ant-design/icons';

const StudentTransactionPage: React.FC = () => {
  const [data, setData] = useState<TransactionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const { userInfo } = useAuth()

  // Fetch data with pagination
  useEffect(() => {
    fetchTransactions(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchTransactions = async (page: number, pageSize: number) => {
    setData([])
    // Replace with actual API call
    const response = await transactionService.getTransactionByStudentId(userInfo?.nameidentifier,page,pageSize)
    setData(response.responseRequestModel.items);
    setTotalItems(response.responseRequestModel.totalItems);
  };

  // Handle page change
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: TransactionType) => (
        <>
          {record.transactionType === 'Credit' ? (
            <span style={{ color: 'green', display: 'flex', alignItems: 'center' }}>
              <ArrowUpOutlined style={{ marginRight: 4 }} />
              {amount}
            </span>
          ) : (
            <span style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
              <ArrowUpOutlined rotate={180} style={{ marginRight: 4 }} />
              {amount}
            </span>
          )}
        </>
      ),
    },
    {
      title: 'Remain Balance',
      dataIndex: 'remainBalance',
      key: 'remainBalance',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span style={{ color: status === 'Success' ? 'green' : 'red' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Transaction Management</h1>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="userId"
        pagination={false}
        bordered
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={handlePageChange}
        showSizeChanger
        onShowSizeChange={handlePageChange}
      />
    </div>
  );
};

export default StudentTransactionPage;
