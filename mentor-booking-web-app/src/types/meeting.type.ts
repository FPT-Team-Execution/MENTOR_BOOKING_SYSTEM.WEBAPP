export type MeetingType = {
    id: string; // Unique identifier for the meeting (UUID as string)
    requestId: string; // Associated request ID
    description: string; // Meeting description
    location?: string; // Optional location field
    meetUp?: string; // Optional meet-up information
    status: string;
}