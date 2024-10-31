
import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker } from 'antd';
import moment from 'moment';
import { getProjectsByStudentId, getRequests } from '../../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';
import { StudentType } from '../../../types/user.types';
import { RequestType } from '../../../types/request.type';
import { isNull } from 'lodash';

const { Title } = Typography;
const { RangePicker } = DatePicker;


interface StudentRequestTableProps {
    studentId: string;
}
// interface PaginationData {
//     totalItems: number;
//     pageIndex: number;
//     pageSize: number;
//     totalPages: number;
// }
// const paginationInfo: PaginationData = {
//     totalItems: ,
//     pageIndex: 1,
//     pageSize: 2,
//     totalPages: Math.ceil(1 / 2),
// };
const RequestTable: React.FC<StudentRequestTableProps> = ({ studentId }) => {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);


    useEffect(() => {
        const fetchRequests = async () => {
            try {

                const projects = await getProjectsByStudentId(studentId, "", 1, 10, 'asc');
                const allRequests = await getRequests(1, 10, "asc");
                const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
                    projects.responseRequestModel.items.some(project => project.id === request.projectId)
                );
                setRequests(filteredRequests);
                setFilteredRequests(filteredRequests);
                console.log('Fetched Requests:', filteredRequests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [studentId]);

    const onDateChange = (dates: any) => {
        setSelectedDates(dates);
        if (dates && dates.length === 2) {
            const [startDate, endDate] = dates;
            const filtered = requests.filter((r) =>
                moment(r.start).isBetween(startDate, endDate, 'days', '[]')
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
                let color = status === '1' ? 'green' : status === '2' ? 'red' : 'orange';
                let statusEnum = status === '1' ? 'Accepted' : status === '2' ? 'Rejected' : 'Pending';
                return <Tag color={color}>{statusEnum}</Tag>;
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
                dataSource={(requests || []).slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: requests.length,
                    onChange: handleChangePage,
                    showSizeChanger: false,
                }}
                bordered
            />
        </div>
    );
};

export default RequestTable;
