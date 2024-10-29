import { GET_BUSY_TIMES, GET_MENTOR, SEARCH_MENTOR } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"

const searchMentor = async (search: string) => {
    const url = SEARCH_MENTOR.replace('{searchItem}',search)
    const result = await axiosInstance.get(url)
    return result.data.responseRequestModel
}


const getMentor = async (id: string) => {
    const url = GET_MENTOR.replace('{id}', id)
    const result = await axiosInstance.get(url)
    return result.data
}

const getBusyTimes = async (mentorId: string, date: string) => {
    const url = GET_BUSY_TIMES.replace('{mentorId}', mentorId).replace('{day}',date)
    const result = await axiosInstance.get(url)
    return result.data
}


export const mentorService = {
    searchMentor,
    getMentor,
    getBusyTimes
}