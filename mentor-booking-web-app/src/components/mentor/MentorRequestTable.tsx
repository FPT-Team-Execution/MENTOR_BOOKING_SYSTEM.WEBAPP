import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { getRequests, updateRequestsById } from '../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { RequestType } from '../../types/request.type';
const { Title } = Typography;
const { RangePicker } = DatePicker;



const MentorRequestTable: React.FC = () => {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const navigate = useNavigate();


    const fetchRequests = async () => {
        try {


            const allRequests = await getRequests(1, 10, "asc");
            const filteredRequests = allRequests.responseRequestModel.items;
            setRequests(filteredRequests);
            setFilteredRequests(filteredRequests);
            console.log('Fetched Requests:', filteredRequests);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    useEffect(() => {


        fetchRequests();
    }, []);

    const handleAccept = async (requestId: string) => {
        try {
            await updateRequestsById(requestId, "title", 0);
            message.success('Request accepted successfully!');
            navigate(`/create-meeting/${requestId}`);
            await fetchRequests();
        } catch (error) {
            console.error('Error accepting request:', error);
            message.error('Failed to accept request');
        }
    };

    const handleDeny = async (id: string) => {
        try {
            await updateRequestsById(id, "title", 1);
            message.success('Request denied successfully!');
            await fetchRequests();
        } catch (error) {
            console.error('Error denying request:', error);
            message.error('Failed to deny request');
        }
    };

    const onDateChange = (dates: any) => {
        setSelectedDates(dates);
        if (dates && dates.length === 2) {
            const [startDate, endDate] = dates;
            const filtered = requests.filter((r) =>
                moment(r.createdOn).isBetween(startDate, endDate, 'days', '[]')
            );
            setFilteredRequests(filtered);
        } else {
            setFilteredRequests(requests);
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
                let color = status == '0' ? 'green' : status == '2' ? 'orange' : 'red';
                let statusEnum = status == '0' ? 'Accepted' : status == '1' ? 'Rejected' : 'Pending';
                return <Tag color={color}>{statusEnum}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: RequestType) => (
                <div>
                    {record.status == '2' && (
                        <>
                            <Button type="primary" onClick={() => handleAccept(record.id)} style={{ marginRight: 8 }}>
                                Accept
                            </Button>
                            <Button type="primary" danger onClick={() => handleDeny(record.id)}>
                                Deny
                            </Button>
                        </>
                    )}
                </div>
            ),
        },
        {
            title: 'View Project',
            key: 'viewProject',
            render: (text: any, record: RequestType) => (
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
                <RangePicker onChange={onDateChange} value={selectedDates} />
            </div>
            <Table
                columns={columns}
                dataSource={(filteredRequests || []).slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredRequests.length,
                    onChange: handleChangePage,
                    showSizeChanger: false,
                }}
                bordered
            />
        </div>
    );
};

export default MentorRequestTable;
