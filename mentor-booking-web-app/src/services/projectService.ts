import { CREATE_PROJECT, GET_PROJECT_BY_ID, GROUP, PROJECT_API_URL } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"
import { ResponseRequestModel, PaginationModel, PageRequestModel } from "../types/common.types";
import { ProjectType } from "../types/project.type";


const getProjects = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<ProjectType>>> => {
    const result = await axiosInstance.get(PROJECT_API_URL(undefined,page))
    return result.data 
}

const getProjectById = async (id: string) => {
    const url = GET_PROJECT_BY_ID.replace('{id}', id)
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

export const getProjectByUserId = async (
    userId: string,
    userRole: string,
    projectStatus: string,
    page: number,
    size: number,
    sortOrder: string
): Promise<ResponseRequestModel<PaginationModel<ProjectType>>> => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axiosInstance.get(`/projects/student/${userId}`, {
            params: {
                userId,
                userRole,
                projectStatus,
                page,
                size,
                sortOrder
            }

        });

        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        throw error;
    }
};

const createProject = async (data: unknown) => {
    const result = await axiosInstance.post(CREATE_PROJECT, data)
    return result.data
}


export const projectService = {
    getProjects,
    getProjectById,
    addStudentToProject,
    getProject,
    createProject
}
