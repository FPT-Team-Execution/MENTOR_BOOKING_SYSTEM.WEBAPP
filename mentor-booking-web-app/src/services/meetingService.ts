import axiosInstance from "../utils/axios/axiosInstance";
import { MeetingType } from "../types/meeting.type";
import { ResponseRequestModel, PaginationModel } from "../types/common.types";
export const createMeeting = async (
    requestId: string,
    description: string,
    location: string,
    isOnline: boolean
): Promise<ResponseRequestModel<MeetingType>> => {
    try {
        // const endpoint = `/requests?page=${page}&size=${size}&sortOrder=${sortOrder}`;
        const accessToken = localStorage.getItem("accessToken");
        const endpoint = `/meetings`;
        const response = await axiosInstance.post(`/meetings`, {
            accessToken,
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