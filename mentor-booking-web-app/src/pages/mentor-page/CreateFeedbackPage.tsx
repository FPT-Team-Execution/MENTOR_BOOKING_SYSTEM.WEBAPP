import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { createFeedback } from '../../services/feedbackService'; // Service để tạo feedback

const { Title, Text } = Typography;

const CreateFeedbackPage: React.FC = () => {
    const { meetingId, userId } = useParams<{ meetingId: string; userId: string }>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFinish = async (values: { message: string }) => {
        setLoading(true);
        try {
            await createFeedback(meetingId ?? "", userId ?? "", values.message);
            message.success("Feedback submitted successfully!");
            navigate('/mentor/meetings'); // Điều hướng về trang chính sau khi gửi phản hồi thành công
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            message.error("Failed to submit feedback.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px', background: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <Title level={2} style={{ textAlign: 'center', color: '#0077b6' }}>Create Feedback</Title>
            <Text style={{ fontSize: '16px', color: '#666666' }}>Please provide your feedback for the meeting below.</Text>
            <Form onFinish={handleFinish} layout="vertical" style={{ marginTop: '24px' }}>
                <Form.Item
                    name="message"
                    label="Your Feedback"
                    rules={[{ required: true, message: 'Please enter your feedback!' }]}
                >
                    <Input.TextArea rows={6} placeholder="Write your feedback here..." maxLength={500} showCount />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Submit Feedback
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateFeedbackPage;
