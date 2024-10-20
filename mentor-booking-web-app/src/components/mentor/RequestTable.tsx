import React, { useEffect, useState } from 'react';
import { Table } from 'antd';


const RequestTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10); 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalItems,setTotalItems] = useState<number>(0)

  useEffect(() => {
    //handle fetch request

  }, [currentPage])

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Calendar Event',
      dataIndex: 'calendarEvent',
      key: 'calendarEvent',
    },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="title"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: handleChangePage,
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
};

export default RequestTable;
