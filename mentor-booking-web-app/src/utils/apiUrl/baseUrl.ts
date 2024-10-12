// BASE URL
export const BASE_URL = "https://localhost:7554/api";

// API URL
export const LOGIN_URL = `${BASE_URL}/auth/sign-in`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const STUDENT_REGISTER = `${BASE_URL}/auth/sign-up`;
export const CONFIRM_EMAIL = `${BASE_URL}/auth/confirm-email`;
export const MENTOR_REGISTER = `${BASE_URL}/auth/mentor/sign-up`;
export const GOOGLE_SIGNIN = `${BASE_URL}/auth/google/sign-in`;

// Calendar Events URLs
export const GET_EVENTS_BY_MENTOR_URL = (mentorId: string, page: number, size: number) =>
    `${BASE_URL}/calendar-event/mentor/${mentorId}?page=${page}&size=${size}`;

export const GET_EVENT_BY_ID_URL = (calendarEventId: string) =>
    `${BASE_URL}/calendar-event/${calendarEventId}`;

export const CREATE_EVENT_URL = `${BASE_URL}/calendar-event`;
export const UPDATE_EVENT_URL = (calendarEventId: string) =>
    `${BASE_URL}/calendar-event/${calendarEventId}`;

export const DELETE_EVENT_URL = (calendarEventId: string) =>
    `${BASE_URL}/calendar-event/${calendarEventId}`;