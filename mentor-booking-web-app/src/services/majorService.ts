
import { MAJOR_API_URL } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"
import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types"
import { Major } from "../types/resource.types"



const getMajors = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<Major>>> => {
    const result = await axiosInstance.get(MAJOR_API_URL(undefined,page))
    return result.data 
}
const getMajorById = async (id: string) : Promise<ResponseRequestModel<Major>> => {
    const result = await axiosInstance.get(MAJOR_API_URL(id, undefined))
    return result.data 
}
const createMajor = async (major: Major) : Promise<ResponseRequestModel<Major>> => {
    const result = await axiosInstance.post(MAJOR_API_URL(undefined, undefined), major)
    return result.data 
}
const updateMajor = async (major: Major) : Promise<ResponseRequestModel<Major>> => {
    const result = await axiosInstance.put(MAJOR_API_URL(major.id, undefined), major)
    return result.data 
}
//no data response 
const deleteMajor = async (id: string) : Promise<ResponseRequestModel<undefined>> => {
    const result = await axiosInstance.delete(MAJOR_API_URL(id, undefined))
    return result.data 
}



export const majorServices = {
    getMajors,
    getMajorById,
    updateMajor,
    deleteMajor,
    createMajor
}