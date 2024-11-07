import axiosInstance from "../utils/axios/axiosInstance";
import { ResponseRequestModel, PaginationModel } from "../types/common.types";
import { FeedbacksModel, FeedbackType } from "../types/feedback.type";
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

export const getAllFeedback = async (
    page: number,
    size: number
): Promise<ResponseRequestModel<PaginationModel<FeedbacksModel>>> => {
    try {
        const response = await axiosInstance.get('https://localhost:7554/Feedbacks', {
            params: {
                page,
                size,
            },
            baseURL: '' // Override the base URL for this specific request
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        throw error;
    }
};


export const getFeedbackByMentorId = async (
    mentorId: string,
    page: Number,
    size: number
): Promise<ResponseRequestModel<PaginationModel<FeedbackType>>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/feedbacks`, {
            params: {
                mentorId,
                page,
                size,
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};