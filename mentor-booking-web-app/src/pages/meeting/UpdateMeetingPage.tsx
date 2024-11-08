import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMeeting } from '../../services/meetingService';
import { getMeetingById } from '../../services/meetingService';

const UpdateMeetingPage: React.FC = () => {
    const [form] = Form.useForm();
    const { meetingId } = useParams<{ meetingId: string }>();
    const navigate = useNavigate();
    const { Option } = Select;

    useEffect(() => {
        const fetchMeetingDetails = async () => {
            try {
                if (meetingId) {
                    const meeting = await getMeetingById(meetingId);
                    form.setFieldsValue({
                        description: meeting.responseRequestModel.meeting.description,
                        location: meeting.responseRequestModel.meeting.location,
                        status: meeting.responseRequestModel.meeting.status || "New", // Thêm status nếu có
                    });
                }
            } catch (error) {
                console.error('Failed to fetch meeting details:', error);
                message.error('Failed to fetch meeting details');
            }
        };

        fetchMeetingDetails();
    }, [meetingId, form]);

    const handleFinish = async (values: any) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            message.error('Access token is missing.');
            return;
        }

        try {
            await updateMeeting(meetingId ?? "", values.description, values.location, "", values.status);
            message.success('Meeting updated successfully!');
            navigate('/mentor/meetings');
        } catch (error) {
            console.error('Failed to update meeting:', error);
            message.error('Failed to update meeting');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2>Update Meeting</h2>
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
                <Form.Item
                    name="status"
                    label="Meeting Status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                >
                    <Select placeholder="Select status">
                        <Option value="Canceled">Cancel</Option>
                        <Option value="Done">Done</Option>
                        <Option value="Done">New</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Meeting
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateMeetingPage;
