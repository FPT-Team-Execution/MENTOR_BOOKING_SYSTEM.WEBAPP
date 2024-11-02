import axiosInstance from "../utils/axios/axiosInstance";
import { MeetingType } from "../types/meeting.type";
import { ResponseRequestModel, PaginationModel } from "../types/common.types";
import axios from "axios";
export const createMeeting = async (
    requestId: string,
    description: string,
    location: string,
    isOnline: boolean
): Promise<ResponseRequestModel<MeetingType>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.post(`/meetings?accessToken=` + accessToken, {
            requestId,
            description,
            location,
            isOnline
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

export const getMeeting = async (
    page: number,
    size: number
): Promise<ResponseRequestModel<PaginationModel<MeetingType>>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/meetings`, {
            params: { page, size }
            // ,
            // headers: {
            //   Authorization: `Bearer ${accessToken}`,
            // },
        }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};