import { PageRequestModel } from "../../types/common.types";

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

export const GET_MENTORS = (page : number, size: number) => `/mentors?page=${page}&size=${size}`
export const UPDATE_MENTOR =  '/mentors/profile'
export const GET_MENTOR_DEGREES = (mentorId: string, page : number, size: number) => `/mentors/${mentorId}/degrees?page=${page}&size=${size}`

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
    return `https://calendar.google.com/calendar/embed?src=${email}&ctz=Asia/Ho_Chi_Minh&showTz=0`
}

export const MENTOR_OWN_PROFILE_URL = "/mentors/profile";

export const STUDENT_OWN_PROFILE_URL = "/students/profile";

export const UPLOAD_AVATAR_URL = "/auth/avatar";

export const MAJOR_API_URL = (id: string | undefined, query: PageRequestModel | undefined) => {
    //get pagination
    if (query) {
        return `/majors?page=${query.page}&size=${query.size}`
    }
    //get by Id + delete
    if (id) {
        return `/majors/${id}`
    }
    //post + put
    return `/majors`;
}

export const PROJECT_API_URL = (id: string | undefined, query: PageRequestModel | undefined) => {
    //get pagination
    if (query) {
        return `/projects?page=${query.page}&size=${query.size}&sortOrder=${query.sort}`
    }
    //get by Id + delete
    if (id) {
        return `/projects/${id}`
    }
    //post + put
    return `/projects`;
}

export const SKILL_API_URL = (id: string | undefined, query: PageRequestModel | undefined) => {
    //get pagination
    if (query) {
        return `/skills?page=${query.page}&size=${query.size}`
    }
    //get by Id + delete
    if (id) {
        return `/skills/${id}`
    }
    //post + put
    return `/skills`;
}
export const STUDENT_API_URL = (id: string | undefined, query: PageRequestModel | undefined) => {
    //get pagination
    if (query) {
        return `/students?page=${query.page}&size=${query.size}`
    }
    //get by Id + delete
    if (id) {
        return `/majors/${id}`
    }
    //post + put
    return `/majors`;
}

export const POSITION_API_URL = (id: string | undefined, query: PageRequestModel | undefined) => {
    //get pagination
    if (query) {
        return `/positions?page=${query.page}&size=${query.size}`
    }
    //get by Id + delete
    if (id) {
        return `/positions/${id}`
    }
    //post + put
    return `/positions`;
}
