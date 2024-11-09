import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { getRequests, updateRequestsById } from '../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { RequestType } from '../../types/request.type';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const MentorRequestTable: React.FC = () => {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);  // Fixed pageSize
    const [totalItems, setTotalItems] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, [currentPage, pageSize]);

    // Fetch requests from the server
    const fetchRequests = async () => {
        try {
            const response = await getRequests(currentPage, pageSize, "des");
            const fetchedRequests = response.responseRequestModel.items;
            setRequests(fetchedRequests);
            setFilteredRequests(fetchedRequests);
            setTotalItems(response.responseRequestModel.totalItems);
        } catch (error) {
            console.error('Error fetching requests:', error);
            message.error('Error fetching requests');
        }
    };

    // Accept request and navigate to create meeting page
    const handleAccept = async (requestId: string, requestTitle: string) => {
        try {
            navigate(`/create-meeting/${requestId}`);
            fetchRequests();
        } catch (error) {
            console.error('Error accepting request:', error);
            message.error('Failed to accept request');
        }
    };

    // Deny request
    const handleDeny = async (requestId: string,requestTitle: string) => {
        try {
            await updateRequestsById(requestId, requestTitle, 1);
            message.success('Request denied successfully!');
            fetchRequests();
        } catch (error) {
            console.error('Error denying request:', error);
            message.error('Failed to deny request');
        }
    };

    // Filter requests by date range
    const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
        setSelectedDates(dates);
        if (dates && dates[0] && dates[1]) {
            const [startDate, endDate] = dates;
            const filtered = requests.filter((request) =>
                moment(request.createdOn).isBetween(startDate, endDate, 'days', '[]')
            );
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(requests);
        }
    };

    // Define table columns
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start Date',
            dataIndex: 'start',
            key: 'start',
            render: (date: string | undefined) => date ? moment(date).format('YYYY-MM-DD HH:mm') : 'N/A',
        },
        {
            title: 'End Date',
            dataIndex: 'end',
            key: 'end',
            render: (date: string | undefined) => date ? moment(date).format('YYYY-MM-DD HH:mm') : 'N/A',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusMap = {
                    '0': { color: 'green', label: 'Accepted' },
                    '1': { color: 'red', label: 'Rejected' },
                    '2': { color: 'orange', label: 'Pending' }
                };
                const { color, label } = statusMap[status] || { color: 'default', label: 'Unknown' };
                return <Tag color={color}>{label}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RequestType) => (
                <>
                    {record.status === 2 && (
                        <>
                            <Button type="primary" onClick={() => handleAccept(record.id, record.title)} style={{ marginRight: 8 }}>
                                Accept
                            </Button>
                            <Button type="primary" danger onClick={() => handleDeny(record.id, record.title)}>
                                Deny
                            </Button>
                        </>
                    )}
                    {record.status === 0 && (
                        
                        <Link to={"/meeting/" + record.id} > 
                            <Button>
                                Go to Meeting
                            </Button>
                        </Link>
                        
                    )}
                </>
            ),
        },
        {
            title: 'View Project',
            key: 'viewProject',
            render: (_: any, record: RequestType) => (
                <Button type="link" onClick={() => navigate(`/project/${record.projectId}`)}>
                    View Project
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Mentor Request Management</Title>
            <div style={{ marginBottom: '16px' }}>
                <RangePicker onChange={handleDateChange} value={selectedDates} />
            </div>
            <Table
                columns={columns}
                dataSource={filteredRequests}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize,
                    total: totalItems,
                    onChange: setCurrentPage,
                    showSizeChanger: false,
                }}
                bordered
            />
        </div>
    );
};

export default MentorRequestTable;
