import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types"
import { ProgressType } from "../types/progress.type"
import { getProgressesByProjectIdUrl, MAJOR_API_URL } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"


const getProgressByProjectId = async (projectId: string, page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<ProgressType>>> => {
    const result = await axiosInstance.get(getProgressesByProjectIdUrl(projectId, page))
    return result.data 
}
const getProgressById = async (id: string) : Promise<ResponseRequestModel<ProgressType>> => {
    const result = await axiosInstance.get(MAJOR_API_URL(id, undefined))
    return result.data 
}
const createProgress = async (progress: ProgressType) : Promise<ResponseRequestModel<ProgressType>> => {
    const result = await axiosInstance.post(MAJOR_API_URL(undefined, undefined), progress)
    return result.data 
}
const updateProgress = async (progress: ProgressType) : Promise<ResponseRequestModel<ProgressType>> => {
    const result = await axiosInstance.put(MAJOR_API_URL(progress.id, undefined), progress)
    return result.data 
}
//no data response 
const deleteProgress = async (id: string) : Promise<ResponseRequestModel<undefined>> => {
    const result = await axiosInstance.delete(MAJOR_API_URL(id, undefined))
    return result.data 
}


export const progressService = {
    getProgressByProjectId,
    getProgressById,
    createProgress,
    updateProgress,
    deleteProgress
}