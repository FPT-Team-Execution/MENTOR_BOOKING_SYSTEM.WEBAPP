import React, { useEffect, useState } from 'react';
import { Typography, Spin, Card, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { getMeetingByRqId } from '../../../services/meetingService';
import moment from 'moment';
import { getRequestsById } from '../../../services/requestService';

const { Title, Text } = Typography;

interface MeetingType {
    id: string;
    requestId: string;
    description: string;
    location: string;
    meetUp: string;
    status: number;
}

interface RequestType {
    id: string;
    title: string;
    start: string;
    end: string;
    mentorId: string;
    calendarEventId: string | null;
    projectId: string;
    createrId: string;
    status: number;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

const MeetingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [meeting, setMeeting] = useState<MeetingType | null>(null);
    const [request, setRequest] = useState<RequestType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            setLoading(true);
            try {
                if (id) {
                    const meetingData = await getMeetingByRqId(id);
                    setMeeting(meetingData.responseModel.meetings[0]);
                    const result = await getRequestsById(id);
                    setRequest(result.responseRequestModel.request);
                }
            } catch (error) {
                console.error('Error fetching meeting details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetingDetails();
    }, [id]);

    if (loading) {
        return <Spin size="large" />;
    }

    if (!meeting || !request) {
        return <Text type="danger">Meeting details not found.</Text>;
    }

    // Format start and end time
    const startTime = moment(request.start).format('DD MMM YYYY HH:mm');
    const endTime = moment(request.end).format('HH:mm');

    return (
        <div className="p-6">
            <Card bordered className="w-full">
                <Title level={3} className="mb-5" style={{ fontSize: '24px' }}>Meeting Details</Title>
                <Space direction="vertical" size="small" className="w-full">
                    <Text style={{ fontSize: '16px' }}><strong>Title:</strong> {request.title}</Text>
                    <Text style={{ fontSize: '16px' }}><strong>Description:</strong> {meeting.description}</Text>
                    <Text style={{ fontSize: '16px' }}><strong>Location:</strong> {meeting.location}</Text>
                    <Text className='flex' style={{ fontSize: '16px' }}><strong>Meetup Link:</strong>{meeting.meetUp !== "" ? (
                        <a className='ml-3' href={meeting.meetUp} target="_blank" rel="noopener noreferrer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Google Meet"
                                role="img"
                                viewBox="0 0 512 512"
                                width="24" // Adjust the width
                                height="24" // Adjust the height
                            >
                                <rect width="10" height="10" rx="15%" fill="#ffffff" />
                                <path d="M166 106v90h-90" fill="#ea4335" />
                                <path d="M166 106v90h120v62l90-73v-49q0-30-30-30" fill="#ffba00" />
                                <path d="M164 406v-90h122v-60l90 71v49q0 30-30 30" fill="#00ac47" />
                                <path d="M286 256l90-73v146" fill="#00832d" />
                                <path d="M376 183l42-34c9-7 18-7 18 7v200c0 14-9 14-18 7l-42-34" fill="#00ac47" />
                                <path d="M76 314v62q0 30 30 30h60v-92" fill="#0066da" />
                                <path d="M76 196h90v120h-90" fill="#2684fc" />
                            </svg>
                        </a>
                    ) : <div className='ml-3'>Not available</div>}</Text>
                    <Text style={{ fontSize: '16px' }}><strong>Time:</strong> {startTime} - {endTime}</Text>
                    <Text style={{ fontSize: '16px' }}><strong>Status:</strong> {meeting.status === 0 ? 'Scheduled' : 'Cancelled'}</Text>
                </Space>
            </Card>
        </div>
    );
};

export default MeetingDetails;
