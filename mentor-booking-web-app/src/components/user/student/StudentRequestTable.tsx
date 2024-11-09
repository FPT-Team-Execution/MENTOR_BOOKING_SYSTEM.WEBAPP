import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Modal, Popconfirm, Button } from 'antd';
import moment from 'moment';
import { getProjectsByStudentId, getRequests } from '../../../services/requestService';
import { decode } from "../../../utils/utils";
import { RequestType } from '../../../types/request.type';
import { TokenData } from "../../../types/common.types";
import { Link } from 'react-router-dom';

const { Title } = Typography;

const RequestTable: React.FC = () => {
    const [requests, setRequests] = useState<RequestType[]>([]);
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

    const fetchRequests = async (page: number, size: number) => {
        try {
            if (userInfo?.nameidentifier) {
                const projects = await getProjectsByStudentId(userInfo.nameidentifier, "", page, size, 'des');
                const allRequests = await getRequests(page, size, "des");

                const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
                    projects.responseRequestModel.items.some(project => project.id === request.projectId)
                );

                setRequests(filteredRequests);
            }
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests(currentPage, pageSize);
    }, [userInfo, currentPage, pageSize]);

    const handleChangePage = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
        fetchRequests(page, pageSize); // Fetch data for new page
    };

    const handleEdit = (request: RequestType) => {
        setEditingRequest(request);
        setIsEditModalVisible(true);
    };

    const handleDelete = (requestId: string) => {
        setRequests(requests.filter(request => request.id !== requestId));
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
                } 
                return <span className="text-gray-500">Not Editable</span>;
            },
        },
    ];

    return (
        <div className="p-6">
            <Table
                columns={columns}
                dataSource={requests}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: requests.length,
                    onChange: handleChangePage,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20', '50'],
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
