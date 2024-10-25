import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import RequestTable from '../../../components/user/student/StudentRequestTable';
import paths from "../../../routes/path";

const StudentRequestPage: React.FC = () => {
    const navigate = useNavigate();
    const studentId = '123'; // Ví dụ về ID sinh viên, có thể lấy ID này từ context hoặc prop

    const handleOnBackClick = () => {
        navigate(paths.home); // Điều hướng về trang chủ hoặc trang khác
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Student Requests</h1>
            <RequestTable studentId={studentId} /> {/* Truyền ID của sinh viên vào RequestTable */}
            <Button style={{ marginTop: '16px' }} onClick={handleOnBackClick}>Back</Button>
        </div>
    );
};

export default StudentRequestPage;
