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
    totalItems: number,
    items: T[]
}

export type RefreshTokenData = {
    newJwtToken: {
        accessToken: string,
        refreshToken: string
    }
}


export type TokenData = {
    aud: string;
    exp: number;
    role: string;
    name: string;
    nameidentifier: string;
    iss: string;
    nbf: number;
    [key: string]: any; // For any other fields
};

export type BusyTimeData = {
    start: string,
    end: string,
}

export type JwtModel = {
    accessToken: string,
    refreshToken: string
}