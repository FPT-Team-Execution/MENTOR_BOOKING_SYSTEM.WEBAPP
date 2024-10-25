import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker } from 'antd';
import moment from 'moment';
import { getRequests, getProjectsByStudentId } from "../services/requestService"; // Import hàm service

const { Title } = Typography;
const { RangePicker } = DatePicker;

const RequestTable: React.FC = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const studentId = '123'; // Giả sử có studentId đã xác định
                const projects = await getProjectsByStudentId({ studentId, page: 1, size: 100, sortOrder: 'asc' }); // Fetch projects của student
                const allRequests = await getRequests({ page: 1, size: 100, sortOrder: 'asc' }); // Fetch tất cả requests

                const projectIds = projects.map((p) => p.id);
                const relatedRequests = allRequests.filter((r) =>
                    projectIds.includes(r.projectId)
                );
                setRequests(relatedRequests);
                setFilteredRequests(relatedRequests);
                setTotalItems(relatedRequests.length);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const onDateChange = (dates) => {
        setSelectedDates(dates);
        if (dates && dates.length === 2) {
            const [startDate, endDate] = dates;
            const filtered = requests.filter((r) =>
                moment(r.start).isBetween(startDate, endDate, 'days', '[]')
            );
            setFilteredRequests(filtered);
            setTotalItems(filtered.length);
        } else {
            setFilteredRequests(requests);
            setTotalItems(requests.length);
        }
    };

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
            title: 'Mentor',
            dataIndex: 'mentorName',
            key: 'mentorName',
        },
        {
            title: 'Start Date',
            dataIndex: 'start',
            key: 'start',
            render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'End Date',
            dataIndex: 'end',
            key: 'end',
            render: (date) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = status === 'Accepted' ? 'green' : status === 'Pending' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Student Request Status</Title>
            <div style={{ marginBottom: '16px' }}>
                <RangePicker onChange={onDateChange} value={selectedDates} />
            </div>
            <Table
                columns={columns}
                dataSource={filteredRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
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
        </div>
    );
};

export default RequestTable;
