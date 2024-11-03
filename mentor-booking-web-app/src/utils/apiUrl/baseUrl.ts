// BASE URL
export const BASE_URL = "https://localhost:7554/api";

// API URL
export const LOGIN_URL = `${BASE_URL}/auth/sign-in`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const STUDENT_REGISTER = `${BASE_URL}/auth/sign-up`;
export const CONFIRM_EMAIL = `${BASE_URL}/auth/confirm-email`;
export const MENTOR_REGISTER = `${BASE_URL}/auth/mentor/sign-up`;
export const GOOGLE_SIGNIN = `${BASE_URL}/auth/google/signin`;
export const CREATE_PROJECT = `${BASE_URL}/projects`;

export const GET_ALL_STUDENTS = '/students?page={page}&size={size}&sortOrder=asc'

export const REFRESH_TOKEN = '/auth/refresh'
export const CALLBACK_URL = 'http://localhost:5173/auth/callback'

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

export const GET_PROJECT_BY_ID = '/groups/students/{id}'

export const GROUP = '/groups'

export const SEARCH_STUDENT = '/groups/students/search/{searchItem}'

export const SEARCH_MENTOR = '/mentors/search/{searchItem}'
export const GET_MENTOR = '/mentors/{id}'

export const REQUEST = '/requests'

export const GET_BUSY_TIMES = '/calendar-events/busy-event?MentorId={mentorId}&Day={day}'

// Request URLs
export const REQUEST_URL = `${BASE_URL}/requests`;
// export const GET_PROJECT_BY_STUDENT_ID = (studentId: string) => `${BASE_URL}/projects/student/${studentId}`;
export const GET_PROJECT_BY_STUDENT_ID = "/api/projects";

export const SIGN_IN_GOOGLE_URL = (code: string) => {
    return `https://localhost:7554/api/auth/signin-google?code=${code}&callbackuri=http://localhost:5173/auth/callback`
}

export const GOOGLE_CALENDAR_FRAME_URL = (email: string | undefined) => {
    return `https://calendar.google.com/calendar/embed?src=${email}&ctz=Asia/Ho_Chi_Minh`
}