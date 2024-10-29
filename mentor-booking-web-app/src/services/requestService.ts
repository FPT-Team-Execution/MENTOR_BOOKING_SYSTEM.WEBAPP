import axiosInstance from "../utils/axios/axiosInstance";
import { GET_PROJECT_BY_STUDENT_ID, REQUEST_URL } from "../utils/apiUrl/baseUrl";
import { ProjectType } from "../types/project.type";
import { RequestType } from "../types/request.type";


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
export const getRequests = async (
    page: number,
    size: number,
    sortOrder: string,
): Promise<RequestType[]> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;

        const endpoint = `/requests`;
        const response = await axiosInstance.get(endpoint, {
            params: {
                page,
                size,
                sortOrder
            }
        });
        console.log('API Response:', response);
        // const response = await axiosInstance.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};
export const getRequestsById = async (
    requestId: string
): Promise<RequestType[]> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;

        const endpoint = `/requests/${requestId}`;
        // const response = await axiosInstance.get(endpoint, {
        //     params: {
        //         page,
        //         size,
        //         sortOrder
        //     }
        // });
        const response = await axiosInstance.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};
// Fetch danh sách project của student theo ID
export const getProjectsByStudentId = async (
    studentId: string,
    projectStatus: string,
    page: number,
    size: number,
    sortOrder: string
): Promise<ProjectType[]> => {
    try {
        const endpoint = `/projects/student/${studentId}`;
        const response = await axiosInstance.get(endpoint, {
            params: {
                studentId,
                projectStatus,
                page,
                size,
                sortOrder
            }
        });
        // const response = await axiosInstance.get(`${GET_PROJECT_BY_STUDENT_ID}/student/${params.studentId}`, { params });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching projects by student ID:", error);
        throw error;
    }
};
export const updateRequestsById = async (
    requestId: string,
    title: string,
    status: string
): Promise<RequestType[]> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;

        const endpoint = `/requests/${requestId}`;
        // const response = await axiosInstance.get(endpoint, {
        //     params: {
        //         page,
        //         size,
        //         sortOrder
        //     }
        // });
        const response = await axiosInstance.put(endpoint, {
            params: {
                title,
                status
            }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

