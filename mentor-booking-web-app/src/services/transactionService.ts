import axiosInstance from "../utils/axios/axiosInstance"

const getTransaction = async (page: number, pageSize: number) => {
    const url = '/point-transactions?page={page}&size={size}'.replace("{page}",page.toString()).replace("{size}",pageSize.toString())
    const result = await axiosInstance.get(url)
    return result.data
}

const getTransactionByStudentId = async (id: string,page: number, pageSize: number) => {
    const url = '/point-transactions/{id}?page={page}&size={size}'.replace("{page}",page.toString()).replace("{size}",pageSize.toString()).replace("{id}",id)
    const result = await axiosInstance.get(url)
    return result.data
}

export const transactionService = {
    getTransaction,
    getTransactionByStudentId
}