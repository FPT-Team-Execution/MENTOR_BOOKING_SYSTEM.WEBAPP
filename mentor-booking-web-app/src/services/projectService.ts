import { GET_PROJECT_BY_ID } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"

const getProjectById = async (id: string) => {
    const url = GET_PROJECT_BY_ID.replace('{id}',id)
    const result = await axiosInstance.get(url)
    return result.data
}

const addStudentToProject = async () => {
    const result = await axiosInstance.post('')
    return result.data
}

export const projectService = {
    getProjectById,
    addStudentToProject
}
