export type FeedbackType = {
    id: string;               // Guid
    userId: string;           // string
    name: string;             // string
    meetingId: string;        // Guid
    message?: string;         // string | null
    createdBy?: string;       // string | null
    createdOn?: string;         // Date | null
    updatedBy?: string;       // string | null
    updatedOn?: string;
}

export type FeedbacksModel = {
    feedback: FeedbackType;
}