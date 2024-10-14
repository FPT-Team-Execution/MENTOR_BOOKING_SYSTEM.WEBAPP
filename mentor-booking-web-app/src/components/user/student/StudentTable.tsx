import React, { useEffect, useState } from 'react';
import { Table, Button, Dropdown, Menu, message, Popconfirm, Modal } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { studentService } from '../../../services/studentService';
import { StudentType } from '../../../types/user.types';


const StudentTable: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<StudentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10); 
  const [totalItems,setTotalItems] = useState<number>(0)

  useEffect(() => {

    const handleFetch = async () => {
      try {
        const res = await studentService.getAllStudent(currentPage.toString(), pageSize.toString())
        if (res) {
          console.log(res)
          setData(res.items)
          setTotalItems(res.totalPages)
        } else {
          console.log('Fail to fetch api')
        }
      } catch (err) {
        console.log("Fail to load students: " + err)
      }
    }

    handleFetch();

  }, [currentPage])

  // Functions for showing confirmation messages
  const handleEdit = (fullname: string) => {
    message.success(`Edit student: ${fullname}`);
  };

  const handleDelete = (fullname: string) => {
    message.success(`Deleted student: ${fullname}`);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleUpdatePoint = (fullname: string) => {
    message.info(`Updated points for: ${fullname}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Menu.Item key="3" onClick={showModal}>
        Update Point
      </Menu.Item>
    </Menu>
  );

  // Change page handler
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // Paginate the student data

  // Define columns for the table
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
      render: (record: { fullName: string }) => (
        <Dropdown overlay={menu(record.fullName)} trigger={['hover']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        dataSource={data}
        columns={columns}
        rowKey="fullname"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: handleChangePage,
          showSizeChanger: false, // Disable changing page size
        }}
        bordered
      />
      <Modal title="Update Point" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          Student name: Banana
        </div>

      </Modal>

    </div>
  );
};

export default StudentTable;
