import React, { useEffect, useState } from 'react';
import { Card, Button, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { MentorType } from '../../types/user.types';
import { mentorService } from '../../services/mentorService';

interface MentorCardProps {
    mentorId: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentorId }) => {
    const [mentor, setMentor] = useState<MentorType | null>(null); // Initialize as null

    useEffect(() => {
        handleSelectMentor(mentorId);
    }, [mentorId]);

    const handleSelectMentor = async (id: string) => {
        try {
            const response = await mentorService.getMentor(id);
            if (response.isSuccess) {
                setMentor(response.responseModel);
            } else {
                message.error("Error at choosing mentor: " + response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className="max-w-72 shadow-lg rounded-lg overflow-hidden block">
            {/* Conditional rendering to avoid accessing properties of undefined */}
            {mentor ? (
                <>
                    {/* Avatar and Name */}
                    <div className="flex items-center mb-1">
                        <img
                            className="w-10 h-10 rounded-full mr-2"
                            src={mentor.avatarUrl}
                            alt={`${mentor.fullName}'s Avatar`}
                        />
                        <div>
                            <h2 className="text-sm font-semibold">{mentor.fullName}</h2>
                        </div>
                    </div>
                    <div className="border-t">
                        <div className="flex items-center">
                            <MailOutlined className="mr-2 text-gray-500" />
                            <span>{mentor.email}</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneOutlined className="mr-2 text-gray-500" />
                            <span>{mentor.phoneNumber ? mentor.phoneNumber : "No phone number provided"}</span>
                        </div>
                        <div className="flex items-center">
                            <UserOutlined className="mr-2 text-gray-500" />
                            <span>Consume Points: {mentor.consumePoint}</span>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading mentor information...</p>
            )}
        </Card>
    );
};

export default MentorCard;
