import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker } from 'antd';
import moment from 'moment';
import { } from '../../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';

// import { getProjectsByStudentId, getRequests } from "../services/requestService";
const { Title } = Typography;
const { RangePicker } = DatePicker;
interface Request {
    id: number;
    title: string;
    mentorName: string;
    start: string;
    end: string;
    status: string;
}
interface StudentRequestTableProps {
    studentId: string; // Khai báo kiểu cho mentorId
}
const RequestTable: React.FC<StudentRequestTableProps> = ({ studentId }) => {
    const [requests, setRequests] = useState<Request[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        // const fetchRequests = async () => {
        //     try {
        //         const studentId = '123'; // Giả sử có studentId đã xác định
        //         const projects = await getProjectsByStudentId({ studentId, page: 1, size: 100, sortOrder: 'asc' }); // Fetch projects của student
        //         const allRequests = await getRequests({ page: 1, size: 100, sortOrder: 'asc' }); // Fetch tất cả requests

        //         const projectIds = projects.map((p: any) => p.id);
        //         const relatedRequests = allRequests.filter((r:any) =>
        //             projectIds.includes(r.projectId)
        //         );
        //         setRequests(relatedRequests);
        //         setFilteredRequests(relatedRequests);
        //         setTotalItems(relatedRequests.length);
        //     } catch (error) {
        //         console.error('Error fetching requests:', error);
        //     }
        // };

        // fetchRequests();
        const mockData: Request[] = [
            {
                id: 1,
                title: 'Request A',
                mentorName: 'John Doe',
                start: moment().subtract(2, 'days').toISOString(),
                end: moment().subtract(1, 'days').toISOString(),
                status: 'Accepted',
            },
            {
                id: 2,
                title: 'Request B',
                mentorName: 'Jane Smith',
                start: moment().subtract(5, 'days').toISOString(),
                end: moment().subtract(4, 'days').toISOString(),
                status: 'Pending',
            },
            {
                id: 3,
                title: 'Request C',
                mentorName: 'Tom Brown',
                start: moment().subtract(1, 'days').toISOString(),
                end: moment().add(1, 'days').toISOString(),
                status: 'Rejected',
            },
        ];

        setRequests(mockData);
        setFilteredRequests(mockData);
        setTotalItems(mockData.length);
    }, [studentId]);

    const onDateChange = (dates: any) => {
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
            render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'End Date',
            dataIndex: 'end',
            key: 'end',
            render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: any) => {
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
