import React, { useState, useEffect } from 'react';
import { Table, Pagination } from 'antd';
import { TransactionType } from '../../types/transation.types';
import { transactionService } from '../../services/transactionService';

const TransactionPage: React.FC = () => {
  const [data, setData] = useState<TransactionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch data with pagination
  useEffect(() => {
    fetchTransactions(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchTransactions = async (page: number, pageSize: number) => {
    // Replace with actual API call
    const response = await transactionService.getTransaction(page,pageSize)
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
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Remain Balance',
      dataIndex: 'remainBalance',
      key: 'remainBalance',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
    },
    {
      title: 'Transaction Type',
      dataIndex: 'transactionType',
      key: 'transactionType',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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

export default TransactionPage;
