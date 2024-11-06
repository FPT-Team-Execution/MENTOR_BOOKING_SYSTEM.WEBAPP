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
    page: Number,
    size: number
): Promise<ResponseRequestModel<PaginationModel<FeedbacksModel>>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/feedbacks/Feedbacks`, {
            params: {
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