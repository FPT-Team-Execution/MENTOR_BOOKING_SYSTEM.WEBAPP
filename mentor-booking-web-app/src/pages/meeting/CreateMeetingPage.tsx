import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useParams } from 'react-router-dom';
import { createMeeting } from '../../services/meetingService'; // Giả sử bạn đã tạo service này
import { getRequestsById } from '../../services/requestService'; // Dịch vụ để lấy yêu cầu theo ID

const CreateMeeting: React.FC = () => {
    const [form] = Form.useForm();
    const { requestId } = useParams<{ requestId: string }>();

    useEffect(() => {
        const fetchRequestDetails = async () => {
            try {
                if (requestId) {
                    const request = await getRequestsById(requestId);
                    // Không cần thiết phải sử dụng requestDetails để điền vào form
                    // Nếu bạn cần thông tin để hiển thị, có thể lưu vào state nhưng không cần dùng để điền vào form
                }
            } catch (error) {
                console.error('Failed to fetch request details:', error);
            }
        };

        fetchRequestDetails();
    }, [requestId]); // Đảm bảo useEffect sẽ chạy lại nếu requestId thay đổi

    const handleFinish = async (values: any) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            message.error('Access token is missing.');
            return;
        }

        try {
            await createMeeting(requestId ?? "", values.description, values.location, false);
            message.success('Meeting created successfully!');
            // Chuyển hướng hoặc reset form tùy theo nhu cầu
            form.resetFields(); // Reset form sau khi tạo cuộc họp
        } catch (error) {
            console.error('Failed to create meeting:', error);
            message.error('Failed to create meeting');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <h2>Create Meeting</h2>
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
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Meeting
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateMeeting;
