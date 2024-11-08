import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, DatePicker, Modal, Popconfirm, Button } from 'antd';
import moment from 'moment';
import { getProjectsByStudentId, getRequests } from '../../../services/requestService';
import dayjs, { Dayjs } from 'dayjs';
import { decode } from "../../../utils/utils";
import { StudentType } from '../../../types/user.types';
import { RequestType } from '../../../types/request.type';
import { isNull } from 'lodash';
import { TokenData } from "../../../types/common.types";
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const RequestTable: React.FC = () => {
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [filteredRequests, setFilteredRequests] = useState<RequestType[]>([]);
    const [selectedDates, setSelectedDates] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [userInfo, setUserInfo] = useState<TokenData>();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRequest, setEditingRequest] = useState<RequestType | null>(null);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken != null) {
            setUserInfo(decode(accessToken));
        }
    }, [accessToken]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                if (userInfo?.nameidentifier) {
                    const projects = await getProjectsByStudentId(userInfo.nameidentifier, "", 1, 10, 'asc');
                    const allRequests = await getRequests(1, 10, "asc");

                    const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
                        projects.responseRequestModel.items.some(project => project.id === request.projectId)
                    );

                    setRequests(filteredRequests);
                    setFilteredRequests(filteredRequests);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [userInfo]);

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

    const handleEdit = (request: RequestType) => {
        setEditingRequest(request);
        setIsEditModalVisible(true);
    };

    const handleDelete = (requestId: string) => {
        setRequests(requests.filter(request => request.id !== requestId));
        setFilteredRequests(filteredRequests.filter(request => request.id !== requestId));
    };

    const handleEditModalClose = () => {
        setIsEditModalVisible(false);
        setEditingRequest(null);
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
            render: (status: number) => {
                const color = status === 0 ? 'green' : status === 1 ? 'red' : 'orange';
                const statusEnum = status === 0 ? 'Accepted' : status === 1 ? 'Rejected' : 'Pending';
                return <Tag color={color}>{statusEnum}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, request: RequestType) => {
                if (request.status === 0) {  // Accepted status
                    return (
                        <Link to={`/meeting/${request.id}`}>
                            <Button type="link">Meeting Info</Button>
                        </Link>
                    );
                } else if (request.status === 2) {  // Pending status
                    return (
                        <div className="flex gap-2">
                            <Button type="primary" onClick={() => handleEdit(request)}>Edit</Button>
                            <Popconfirm
                                title="Are you sure you want to delete this request?"
                                onConfirm={() => handleDelete(request.id)}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger>Delete</Button>
                            </Popconfirm>
                        </div>
                    );
                }
                return <span className="text-gray-500">Not Editable</span>;
            },
        },
    ];

    return (
        <div className="p-6">
            <div className="mb-4">
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
                className="w-full"
            />
            <Modal
                title="Edit Request"
                open={isEditModalVisible}
                onCancel={handleEditModalClose}
                onOk={handleEditModalClose}
                okText="Update"
            >
                <p>Editing request: {editingRequest?.title}</p>
            </Modal>
        </div>
    );
};

export default RequestTable;
