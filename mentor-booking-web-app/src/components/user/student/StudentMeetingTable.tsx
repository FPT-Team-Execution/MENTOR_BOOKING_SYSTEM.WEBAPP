import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, Button, message, Tooltip } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '../../../services/requestService';
import { getMeeting } from '../../../services/meetingService';
import { getProjectByUserId } from '../../../services/projectService';
import { getAllFeedback } from '../../../services/feedbackService';
import { decode } from "../../../utils/utils";
import { TokenData } from "../../../types/common.types";
import { MeetingType } from '../../../types/meeting.type';
import { FeedbackType } from '../../../types/feedback.type';

interface MeetingEvent {
    id: string;
    title: string;
    status: string;
    start: Date;
    end: Date;
    location: string;
    feedback: FeedbackType | null;
}

const { Title } = Typography;

const StudentMeetingTable: React.FC = () => {
    const [meetings, setMeetings] = useState<MeetingEvent[]>([]);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<TokenData>();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken) {
            setUserInfo(decode(accessToken));
        }
    }, [accessToken]);

    const fetchMeetings = async () => {
        try {
            if (userInfo?.nameidentifier) {
                const allRequests = await getRequests(1, 10, "asc");
                const allMeetings = await getMeeting(1, 10);
                const studentProject = await getProjectByUserId(userInfo.nameidentifier, userInfo.role, "Activated", 1, 10, "asc");
                const projectId = studentProject.responseRequestModel.items[0]?.id;
                const allFeedbacks = await getAllFeedback(1, 10);
                const filteredRequests = allRequests.responseRequestModel.items.filter(request =>
                    request.projectId === projectId && request.status === 0
                );

                const meetingEvents: MeetingEvent[] = filteredRequests.flatMap((request) => {
                    const meeting = allMeetings.responseRequestModel.items.find(
                        (meet: MeetingType) => meet.requestId === request.id
                    );

                    if (meeting) {
                        const feedback = allFeedbacks.responseRequestModel.items.find(
                            (feedback: FeedbackType) => feedback.meetingId === meeting.id
                        );

                        const getMeetingStatusText = (status: string | number) => {
                            switch (status) {
                                case "0":
                                case 0:
                                    return "New";
                                case "1":
                                case 1:
                                    return "Done";
                                case "2":
                                case 2:
                                    return "Delayed";
                                case "3":
                                case 3:
                                    return "Canceled";
                                default:
                                    return "Unknown Status";
                            }
                        };

                        return {
                            id: meeting.id,
                            title: request.title,
                            status: getMeetingStatusText(meeting.status),
                            start: new Date(request.start),
                            end: new Date(request.end),
                            location: meeting.location || "No location specified",
                            feedback: feedback || null,
                        };
                    }
                    return []; // Loại bỏ mục này khỏi kết quả nếu không có meeting phù hợp
                });

                setMeetings(meetingEvents);
            }

        } catch (error) {
            console.error('Error fetching meetings:', error);
            message.error('Failed to load meetings');
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, [userInfo]);

    const columns = [
        {
            title: 'Meeting Event',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
            render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
            render: (date: Date) => moment(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = status === 'New' ? 'blue' : status === 'Done' ? 'green' : status === 'Delayed' ? 'orange' : 'red';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Feedback from mentor',
            dataIndex: 'feedback',
            key: 'feedback',
            render: (feedback: FeedbackType | null) => (
                feedback ? (
                    <Tooltip >
                        <Tag color="purple"> {feedback.message}</Tag>
                    </Tooltip>
                ) : (
                    <Tag color="gray">No Feedback</Tag>
                )
            ),
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Student Meeting Management</Title>
            <Table
                columns={columns}
                dataSource={meetings}
                rowKey="id"
                bordered
            />
        </div>
    );
};

export default StudentMeetingTable;
