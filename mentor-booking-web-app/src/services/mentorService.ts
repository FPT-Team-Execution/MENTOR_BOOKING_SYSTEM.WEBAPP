
import { GET_MENTORS, GET_BUSY_TIMES, GET_MENTOR, SEARCH_MENTOR } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"
import { PaginationModel, ResponseRequestModel } from "../types/common.types"
import { MentorType } from "../types/user.types"

const searchMentor = async (search: string) => {
    const url = SEARCH_MENTOR.replace('{searchItem}',search)
    const result = await axiosInstance.get(url)
    return result.data.responseRequestModel
}

const getMentors = async (page: number, size: number) : Promise<ResponseRequestModel<PaginationModel<MentorType>>> => {
    const result = await axiosInstance.get(GET_MENTORS(page, size))
    return result.data 
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
    getMentors,
    getBusyTimes
}