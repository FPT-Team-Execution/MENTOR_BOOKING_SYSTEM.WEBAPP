import React from 'react';

interface RequestCardProps {
    title: string;
    start: string; 
    end: string;
}

const RequestCard: React.FC<RequestCardProps> = ({
    title,
    start,
    end
}) => {
    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-md">
            <h2 className="font-semibold mb-2">Booking Details</h2>
            <div className="space-y-2">
                <div>
                    <strong>Title:</strong> {title}
                </div>
                <div>
                    <strong>Start Time:</strong> {new Date(start).toLocaleString()}
                </div>
                <div>
                    <strong>End Time:</strong> {new Date(end).toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
