export type GetStudentResModel = {
    id: string,
    university: string,
    walletPoint: number
    majorId: string,
    fullName: string,
    avatarUrl: string,
    birthday: Date | null,
    userName: string
    email: string,
    phoneNumber: string,
    emailConfirmed: boolean,
    lockoutEnd: Date
    lockoutEnabled: boolean,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    gender: string
}