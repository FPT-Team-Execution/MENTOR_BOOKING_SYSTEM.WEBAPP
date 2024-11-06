
import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types";
import { CreateStudentType } from "../types/student.types";

import { StudentType } from "../types/user.types";
import { GET_ALL_STUDENTS, SEARCH_STUDENT, STUDENT_API_URL } from "../utils/apiUrl/baseUrl";
import axiosInstance from "../utils/axios/axiosInstance"


const getStudents = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<StudentType>>> => {
    const result = (await axiosInstance.get(`${STUDENT_API_URL(undefined, page)}&sortOrder=${page.sort}`))
    return result.data;
}

const getAllStudent = async (page: string, size: string) => {
    const url = GET_ALL_STUDENTS
    const result = (await axiosInstance.get<ResponseRequestModel<PaginationModel<StudentType>>>(url.replace('{page}',page).replace('{size}',size)))
    return result.data.responseRequestModel
}

const searchStudent = async (search: string) => {
    const url = SEARCH_STUDENT.replace('{searchItem}',search)
    const result = await axiosInstance.get(url)
    return result.data.responseRequestModel
}

const updateStudentPoint = async (payload: unknown) => {
    const url = '/point-transactions'
    const result = await axiosInstance.post(url,payload)
    return result.data.responseRequestModel
}

const updateStudent = async (student: StudentType) => {
    const url = '/students/profile'
    const result = await axiosInstance.put(url,student)
    return result.data.responseRequestModel
}

const createStudent = async (student: CreateStudentType) => {
    const url = '/students'
    const result = await axiosInstance.post(url,student)
    return result.data
}

export const studentService = {
    getStudents,
    getAllStudent,
    searchStudent,
    updateStudentPoint,
    updateStudent,
    createStudent
}

