import axiosInstance from "../utils/axios/axiosInstance";
import { GET_PROJECT_BY_STUDENT_ID, REQUEST_URL } from "../utils/apiUrl/baseUrl";


export interface GetRequestsPaginationRequest {
    page: number;
    size: number;
    sortOrder: string;
}

export interface GetProjectsByStudentIdRequest {
    studentId: string;
    projectStatus?: string;
    page: number;
    size: number;
    sortOrder: string;
}
export interface RequestResponseDto {
    id: string;
    title: string;
    calendarEventId: string;
    projectId?: string;
    createrId: string;
    creater: string;
    status: string;
    createdBy?: string;
    createdOn?: string;
    updatedBy?: string;
    updatedOn?: string;
}

export interface ProjectResponseDto {
    id: string;
    title: string;
    description: string;
    dueDate: string;        // Định dạng ISO (string) cho Date
    semester: string;
    createdBy?: string;
    mentorId: string;
    status: string;
}
// Fetch danh sách request theo phân trang
export const getRequests = async (params: GetRequestsPaginationRequest): Promise<RequestResponseDto[]> => {
    try {
        const response = await axiosInstance.get(REQUEST_URL, { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

// Fetch danh sách project của student theo ID
export const getProjectsByStudentId = async (params: GetProjectsByStudentIdRequest): Promise<ProjectResponseDto[]> => {
    try {
        const response = await axiosInstance.get(`${GET_PROJECT_BY_STUDENT_ID}/student/${params.studentId}`, { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching projects by student ID:", error);
        throw error;
    }
};
