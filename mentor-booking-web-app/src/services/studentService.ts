import { PaginationModel, ResponseRequestModel } from "../types/common.types";
import { StudentType } from "../types/user.types";
import { GET_ALL_STUDENTS } from "../utils/apiUrl/baseUrl";
import axiosInstance from "../utils/axios/axiosInstance"



const getAllStudent = async (page: string, size: string) => {
    const url = GET_ALL_STUDENTS
    const result = (await axiosInstance.get<ResponseRequestModel<PaginationModel<StudentType>>>(url.replace('{page}',page).replace('{size}',size)))
    return result.data.responseRequestModel
}

const searchStudent = async (search: string) => {
    const url = '' + search
    const result = await axiosInstance.get(url)
    return result.data.responseRequestModel
}

export const studentService = {
    getAllStudent,
    searchStudent
}

