import React, { useState } from 'react';
import StudentTable from '../../../components/user/student/StudentTable';
import CreateStudent from '../../../components/user/student/CreateStudent';
import { Modal, Button } from 'antd';

export const StudentPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-lg font-bold">Student Management</h1>
      <Button type="primary" onClick={openCreateModal} style={{ marginBottom: '16px' }}>
        Create Student
      </Button>
      
      <StudentTable />

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

export default StudentPage;
