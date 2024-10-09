import { StudentType } from "../types/user.types";
import { GET_ALL_STUDENTS } from "../utils/apiUrl/baseUrl";
import axiosInstance from "../utils/axios/axiosInstance"

type responseModel<T> = {
  isSuccess: true,
  message: string,
  statusCode: number,
  responseRequestModel: T
}

type paginationModel<T> = {
    pageIndex: number,
    pageSize: number,
    totalPages: number,
    items: T[]
}

const getAllStudent = async (page: string, size: string) => {
    const url = GET_ALL_STUDENTS
    const result = (await axiosInstance.get<responseModel<paginationModel<StudentType>>>(url.replace('{page}',page).replace('{size}',size)))
    return result.data.responseRequestModel
}

export const studentService = {
    getAllStudent
}
