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
    pageIndex: number | 0,
    pageSize: number | 0,
    totalPages: number | 0,
    totalItems: number | 0,
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

export type GoogleTokenResponse = {
    access_token: string,
    refresh_token: string,
    expires_in: string,
    token_type: string,
    scope: string,
    isSuccess: boolean
}

export type ExternalSignInResponseModel = {
    jwtModel: JwtModel,
    googleToken: GoogleTokenResponse
}

//* Requets common
export type PageRequestModel = {
    page: number,
    size: number,
    sort: string| undefined,
}
export type PageResponseModel<T> = {
    pageIndex: number | 0,
    pageSize: number | 0,
    totalPages: number | 0,
    totalItems: number | 0,
    items: T[]
}
export type UploadAvatarResModel = {
    avatarUrl: string

}

export type CreateCalendarEventType = {
    accessToken: string;
    start: string; // ISO date string
    end: string;   // ISO date string
    mentorId: string;
    meetingId: string;
  };
  