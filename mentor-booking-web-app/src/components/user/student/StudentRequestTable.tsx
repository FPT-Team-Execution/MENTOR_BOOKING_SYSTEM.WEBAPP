
import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker } from 'antd';
import moment from 'moment';
import { getProjectsByStudentId, getRequests } from '../../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';
import { decode } from "../../../utils/utils";
import { StudentType } from '../../../types/user.types';
import { RequestType } from '../../../types/request.type';
import { isNull } from 'lodash';
import { TokenData } from "../../../types/common.types";
const { Title } = Typography;
const { RangePicker } = DatePicker;




const RequestTable: React.FC = () => {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [userInfo, setUserInfo] = useState<TokenData>();
    const accessToken = localStorage.getItem("accessToken");
    useEffect(() => {
        // Giải mã `accessToken` và lưu vào `userInfo`
        if (accessToken != null) {
            setUserInfo(decode(accessToken));
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Kiểm tra nếu `userInfo` và `nameidentifier` đã được thiết lập
                if (userInfo?.nameidentifier) {
                    const projects = await getProjectsByStudentId(userInfo.nameidentifier, "", 1, 10, 'asc');
                    const allRequests = await getRequests(1, 10, "asc");

                    const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
                        projects.responseRequestModel.items.some(project => project.id === request.projectId)
                    );

                    setRequests(filteredRequests);
                    setFilteredRequests(filteredRequests);
                    console.log('Fetched Requests:', filteredRequests);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [userInfo]); // Chỉ chạy khi `userInfo` thay đổi và đã có giá trị


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
