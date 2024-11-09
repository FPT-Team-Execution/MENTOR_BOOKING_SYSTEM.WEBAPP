import { POSITION_API_URL } from "../utils/apiUrl/baseUrl";
import axiosInstance from "../utils/axios/axiosInstance"
import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types"
import { Position } from "../types/resource.types"


const getPositions = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<Position>>> => {
    const result = await axiosInstance.get(POSITION_API_URL(undefined,page))
    return result.data 
}
const getPositionById = async (id: string) : Promise<ResponseRequestModel<Position>> => {
    const result = await axiosInstance.get(POSITION_API_URL(id, undefined))
    return result.data 
}
const createPosition = async (position: Position) : Promise<ResponseRequestModel<Position>> => {
    const result = await axiosInstance.post(POSITION_API_URL(undefined, undefined), position)
    return result.data 
}
const updatePositon = async (position: Position) : Promise<ResponseRequestModel<Position>> => {
    const result = await axiosInstance.put(POSITION_API_URL(position.id, undefined), position)
    return result.data 
}
//no data response 
const deletePositon = async (id: string) : Promise<ResponseRequestModel<undefined>> => {
    const result = await axiosInstance.delete(POSITION_API_URL(id, undefined))
    return result.data 
}


export const positionService = {
    getPositions,
    getPositionById,
    createPosition,
    updatePositon,
    deletePositon
}