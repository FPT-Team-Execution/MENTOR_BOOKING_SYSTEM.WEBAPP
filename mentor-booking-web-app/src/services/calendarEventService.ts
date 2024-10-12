import axiosInstance from "../utils/axios/axiosInstance";
import {
    GET_EVENTS_BY_MENTOR_URL,
    GET_EVENT_BY_ID_URL,
    CREATE_EVENT_URL,
    DELETE_EVENT_URL,
    UPDATE_EVENT_URL
} from "../utils/apiUrl/baseUrl";

// Interface cho dữ liệu Calendar Event
export interface CalendarEvent {
    id: string;               // Unique identifier for the event
    htmlLink?: string;        // HTML link to the event
    summary: string;          // Summary or title of the event
    description?: string;     // Optional description of the event
    iCalUID: string;          // Unique identifier for the event in iCal format
    created: string;          // Creation timestamp (ISO format)
    updated: string;          // Last update timestamp (ISO format)
    meetingId?: string;       // Optional Meeting ID associated with the event
    mentorId: string;         // Mentor ID associated with the event
    start: string;            // Start time of the event (ISO format)
    end: string;              // End time of the event (ISO format)
    status: string;           // Status of the event (e.g., "confirmed", "tentative", "cancelled")
}

const getEventsByMentorId = async (mentorId: string, page: number, size: number): Promise<CalendarEvent[]> => {
    try {
        const response = await axiosInstance.get(`${GET_EVENTS_BY_MENTOR_URL}/${mentorId}`, {
            params: { page, size }
        });

        return response.data.data;
    } catch (error) {
        console.error("Error fetching events by mentor ID:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

// Fetch a single event by ID
const getEventById = async (calendarEventId: string): Promise<CalendarEvent> => {
    try {
        const response = await axiosInstance.get(`${GET_EVENT_BY_ID_URL}/${calendarEventId}`);

        return response.data.data;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

// Create a new event
const createEvent = async (event: CalendarEvent): Promise<CalendarEvent> => {
    try {
        const response = await axiosInstance.post(`${CREATE_EVENT_URL}`, event);

        return response.data.data;
    } catch (error) {
        console.error("Error creating event:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

// Update an existing event
const updateEvent = async (calendarEventId: string, event: CalendarEvent): Promise<CalendarEvent> => {
    try {
        const response = await axiosInstance.put(`${UPDATE_EVENT_URL}/${calendarEventId}`, event);

        return response.data.data;
    } catch (error) {
        console.error("Error updating event:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

// Delete an event by ID
const deleteEvent = async (calendarEventId: string): Promise<void> => {
    try {
        await axiosInstance.delete(`${DELETE_EVENT_URL}/${calendarEventId}`);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error; // Ném lại lỗi để xử lý ở nơi khác
    }
};

export {
    getEventsByMentorId,
    getEventById,
    updateEvent,
    deleteEvent,
    createEvent,
};
