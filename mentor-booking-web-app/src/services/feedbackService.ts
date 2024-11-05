import axiosInstance from "../utils/axios/axiosInstance";
import { ResponseRequestModel, PaginationModel } from "../types/common.types";

export const createFeedback = async (
    meetingId: string,
    userId: string,
    message: string,
): Promise<ResponseRequestModel<string>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.post(`/feedbacks`, {
            meetingId,
            userId,
            message
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