import axiosInstance from "../utils/axios/axiosInstance";
import { GET_PROJECT_BY_STUDENT_ID, REQUEST_URL } from "../utils/apiUrl/baseUrl";
import { ProjectType } from "../types/project.type";
import { RequestType } from "../types/request.type";
import { ResponseRequestModel, PaginationModel } from "../types/common.types";


// Fetch danh sách request theo phân trang
export const getRequests = async (
    page: number,
    size: number,
    sortOrder: string,
): Promise<ResponseRequestModel<PaginationModel<RequestType>>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const endpoint = `/requests`;
        const response = await axiosInstance.get(endpoint, {
            // headers: {
            //     Authorization: `Bearer ${accessToken}`,
            // },
            params: {
                page,
                size,
                sortOrder
            }
        });
        console.log('API Response:', response);
        // const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};
export const getRequestsById = async (
    requestId: string
): Promise<ResponseRequestModel<RequestType>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;

        const endpoint = `/requests/${requestId}`;
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

export const getProjectsByStudentId = async (
    studentId: string,
    projectStatus: string,
    page: number,
    size: number,
    sortOrder: string
): Promise<ResponseRequestModel<PaginationModel<ProjectType>>> => {
    try {
        const endpoint = `/projects/student/${studentId}`;
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(endpoint, {
            // headers: {
            //     Authorization: `Bearer ${accessToken}`,
            // }
            // ,
            params: {
                studentId,
                projectStatus,
                page,
                size,
                sortOrder
            }
        });
        // const response = await axiosInstance.get(`${GET_PROJECT_BY_STUDENT_ID}/student/${params.studentId}`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching projects by student ID:", error);
        throw error;
    }
};
export const updateRequestsById = async (
    requestId: string,
    title: string,
    status: number
): Promise<ResponseRequestModel<RequestType>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const endpoint = `/requests/${requestId}`;
        // const response = await axiosInstance.get(endpoint, {
        //     params: {
        //         page,
        //         size,
        //         sortOrder
        //     }
        // });
        const response = await axiosInstance.put(endpoint,
            {
                title,
                status
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }


            });
        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

