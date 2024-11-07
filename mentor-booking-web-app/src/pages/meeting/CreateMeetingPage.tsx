import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Spin, Typography, Checkbox } from 'antd';
import { useParams } from 'react-router-dom';
import { createMeeting } from '../../services/meetingService';
import { getRequestsById } from '../../services/requestService';
import { createCalendar } from '../../services/calendarEventService';
import { RequestType } from '../../types/request.type';
import { CreateCalendarEventType } from '../../types/common.types';
import moment from 'moment';

const { Title, Text } = Typography;

const CreateMeeting: React.FC = () => {
    const [form] = Form.useForm();
    const { requestId } = useParams<{ requestId: string }>();
    const [request, setRequest] = useState<RequestType | null>(null);
    const [loading, setLoading] = useState(false);
    const [creatingMeeting, setCreatingMeeting] = useState(false);

    useEffect(() => {
        const fetchRequestDetails = async () => {
            setLoading(true);
            try {
                if (requestId) {
                    const result = await getRequestsById(requestId);
                    setRequest(result.responseRequestModel.request);
                }
            } catch (error) {
                console.error('Failed to fetch request details:', error);
                message.error('Failed to load request details');
            } finally {
                setLoading(false);
            }
        };

        fetchRequestDetails();
    }, [requestId]);

    const handleFinish = async (values: any) => {
        const accessToken = localStorage.getItem("googleAccessToken");
        if (!accessToken) {
            message.error('Access token is missing.');
            return;
        }

        setCreatingMeeting(true);
        try {
            const response = await createMeeting(requestId ?? "", values.description, values.location, values.isOnline);
            if (response.isSuccess) {
                const calendarRes = await createCalendar({
                    accessToken,
                    start: request?.start,
                    end: request?.end,
                    mentorId: request?.mentorId,
                    meetingId: response.responseModel.requestId
                } as CreateCalendarEventType);

                if (calendarRes.isSuccess) {
                    message.success('Meeting created successfully!');
                    form.resetFields();
                }
            }
        } catch (error) {
            console.error('Failed to create meeting:', error);
            message.error('Failed to create meeting');
        } finally {
            setCreatingMeeting(false);
        }
    };

    return (
        <Spin spinning={loading || creatingMeeting}>
            <div style={{ padding: '24px' }}>
                <Title level={2}>Create Meeting</Title>
                
                {request && (
                    <div style={{ marginBottom: '24px' }}>
                        <Text strong>Title:</Text> <Text>{request.title}</Text><br />
                        <Text strong>Start:</Text> <Text>{moment(request.start).format('YYYY-MM-DD HH:mm')}</Text><br />
                        <Text strong>End:</Text> <Text>{moment(request.end).format('YYYY-MM-DD HH:mm')}</Text>
                    </div>
                )}

                <Form form={form} onFinish={handleFinish} layout="vertical">
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input a description!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: false }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="isOnline" valuePropName="checked">
                        <Checkbox>Is this meeting online?</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={creatingMeeting}>
                            Create Meeting
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default CreateMeeting;
