import axiosInstance from "../utils/axios/axiosInstance";
import { MeetingType, MeetingResponeModel } from "../types/meeting.type";
import { ResponseRequestModel, PaginationModel, ResponseModel } from "../types/common.types";
export const createMeeting = async (
    requestId: string,
    description: string,
    location: string,
    isOnline: boolean
): Promise<ResponseModel<MeetingType>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const googleToken = localStorage.getItem("googleAccessToken");
        const response = await axiosInstance.post(`/meetings?accessToken=` + googleToken, {
            requestId,
            description,
            location,
            isOnline
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

export const getMeeting = async (
    page: number,
    size: number
): Promise<ResponseRequestModel<PaginationModel<MeetingType>>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/meetings`, {
            params: { page, size }

        }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

export const updateMeeting = async (
    meetingId: string,
    description: string,
    location: string,
    meetUp: string,
    status: string
): Promise<ResponseRequestModel<MeetingResponeModel>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.put(`/meetings/${meetingId}`, {

            description,
            location,
            meetUp,
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

export const getMeetingById = async (
    meetingId: string
): Promise<ResponseRequestModel<MeetingResponeModel>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/meetings/${meetingId}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};