import { PaginationModel, ResponseModel } from "../types/common.types";
import { StudentType } from "../types/user.types";
import { GET_ALL_STUDENTS } from "../utils/apiUrl/baseUrl";
import axiosInstance from "../utils/axios/axiosInstance"



const getAllStudent = async (page: string, size: string) => {
    const url = GET_ALL_STUDENTS
    const result = (await axiosInstance.get<ResponseModel<PaginationModel<StudentType>>>(url.replace('{page}',page).replace('{size}',size)))
    return result.data.responseRequestModel
}

export const studentService = {
    getAllStudent
}
