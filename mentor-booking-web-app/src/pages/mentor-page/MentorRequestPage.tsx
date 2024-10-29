import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import RequestTable from '../../components/mentor/MentorRequestTable';
import paths from "../../routes/path";

const MentorRequestPage: React.FC = () => {
    const navigate = useNavigate();
    const MentorId = 'b4a11fdd-fd15-4c7d-931f-4e35b733da12'; // Ví dụ về ID sinh viên

    const handleOnBackClick = () => {
        navigate(paths.home); // Điều hướng về trang chủ hoặc trang khác
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Student Requests</h1>
            <RequestTable mentorId={MentorId} />
            <Button style={{ marginTop: '16px' }} onClick={handleOnBackClick}>Back</Button>
        </div>
    );
};

export default MentorRequestPage;