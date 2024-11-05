import { SKILL_API_URL } from "../utils/apiUrl/baseUrl"
import axiosInstance from "../utils/axios/axiosInstance"
import { PageRequestModel, PaginationModel, ResponseRequestModel } from "../types/common.types"
import { Skill, SkillSummary } from "../types/resource.types"



const getSkills = async (page: PageRequestModel) : Promise<ResponseRequestModel<PaginationModel<SkillSummary>>> => {
    const result = await axiosInstance.get(SKILL_API_URL(undefined,page))
    return result.data 
}
const getSkillById = async (id: string) : Promise<ResponseRequestModel<SkillSummary>> => {
    const result : ResponseRequestModel<Skill> = await axiosInstance.get(SKILL_API_URL(id, undefined))
    const skillSummary : ResponseRequestModel<SkillSummary> = {
        ...result, 
        responseRequestModel: {
            id: result.responseRequestModel.id,
            name: result.responseRequestModel.name,
            mentorId: result.responseRequestModel.mentorId,
            mentorName: result.responseRequestModel.mentor.user.fullName,
            mentorEmail: result.responseRequestModel.mentor.user.email,
        }
        
    }
    return skillSummary;
}
const createSkill = async (skill: SkillSummary) : Promise<ResponseRequestModel<Skill>> => {
    const result = await axiosInstance.post(SKILL_API_URL(undefined, undefined), skill)
    return result.data 
}
const updateSkill = async (skill: SkillSummary) : Promise<ResponseRequestModel<Skill>> => {
    const result = await axiosInstance.put(SKILL_API_URL(skill.id, undefined), {
        name: skill.name
    })
    return result.data 
}
//no data response 
const deleteSKill = async (id: string) : Promise<ResponseRequestModel<undefined>> => {
    const result = await axiosInstance.delete(SKILL_API_URL(id, undefined))
    return result.data 
}



export const skillService = {
    getSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSKill
}