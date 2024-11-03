import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import RequestTable from '../../components/mentor/MentorRequestTable';
import MentorMeetingTable from '../../components/mentor/MentorMeetingTable';
import paths from "../../routes/path";

const MentorMeetingPage: React.FC = () => {
    const navigate = useNavigate();
    // Ví dụ về ID sinh viên

    const handleOnBackClick = () => {
        navigate(paths.home); // Điều hướng về trang chủ hoặc trang khác
    };

    return (
        <div style={{ padding: '24px' }}>
            <MentorMeetingTable />
            <Button style={{ marginTop: '16px' }} onClick={handleOnBackClick}>Back</Button>
        </div>
    );
};

export default MentorMeetingPage;