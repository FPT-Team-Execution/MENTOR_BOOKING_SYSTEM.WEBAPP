import { REQUEST } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"

const sendRequest = async (request: unknown) => {
    const result = await axiosInstance.post(REQUEST,request)
    return result.data
}

export const bookingService = {
    sendRequest
}