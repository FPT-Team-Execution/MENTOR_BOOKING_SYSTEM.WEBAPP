import { GET_PROJECT_BY_ID, GROUP } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"

const getProjectById = async (id: string) => {
    const url = GET_PROJECT_BY_ID.replace('{id}',id)
    const result = await axiosInstance.get(url)
    return result.data
}

const addStudentToProject = async (data: unknown) => {
    const result = await axiosInstance.post(GROUP, data)
    return result.data
}

const getProject = async (params: unknown, id: string) => {
    const url = '/projects/user/' + id
    const result = await axiosInstance.get(url, {
        params: params
    })
    return result.data

}

export const projectService = {
    getProjectById,
    addStudentToProject,
    getProject
}
