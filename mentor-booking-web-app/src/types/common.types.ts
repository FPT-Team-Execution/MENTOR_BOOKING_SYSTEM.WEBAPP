export type ResponseRequestModel<T> = {
    isSuccess: true,
    message: string,
    statusCode: number,
    responseRequestModel: T
}

export type ResponseModel<T> = {
    isSuccess: true,
    message: string,
    statusCode: number,
    responseModel: T
}
  
export type PaginationModel<T> = {
    pageIndex: number,
    pageSize: number,
    totalPages: number,
    items: T[]
}

export type RefreshTokenData = {
    newJwtToken: {
        accessToken: string,
        refreshToken: string
    }
  }