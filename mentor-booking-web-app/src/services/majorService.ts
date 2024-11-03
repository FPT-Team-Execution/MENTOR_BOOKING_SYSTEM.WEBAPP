
import { MAJOR_API_URL } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"
import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types"
import { Major } from "../types/resource.types"



const getMajors = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<Major>>> => {
    const result = await axiosInstance.get(MAJOR_API_URL(undefined,page))
    return result.data 
}



export const majorServices = {
    getMajors
}