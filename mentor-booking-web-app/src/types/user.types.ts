export type StudentType = {
  studentId: string;
  id: string,
  university: string,
  walletPoint: number,
  majorId: string,
  fullName: string,
  avatarUrl: string,
  gender: string,
  birthday: string,
  userName: string,
  email: string,
  phoneNumber: string,
  emailConfirmed: boolean,
  lockoutEnd: string,
  lockoutEnabled: boolean,
  createdBy: string,
  createdOn: string,
  updatedBy: string,
  updatedOn: string
}

export type MentorType = {
  id: string;
  industry: string | null;
  consumePoint: number;

  fullName: string;
  avatarUrl: string | null;
  gender: string;
  birthday: Date | null;

  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
  emailConfirmed: boolean;
  lockoutEnd: Date | null;
  lockoutEnabled: boolean;
  createdBy: string | null;
  createdOn: Date | null;
  updatedBy: string | null;
  updatedOn: Date | null;
  mentorId: string;
}

export type User = {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string; 
  lockoutEnabled: boolean;
  accessFailedCount: number;
  fullName: string;
  avatarUrl: string;
  gender: string;
  birthday: Date;
  createdBy: Date;
  createdOn: Date;
  updatedBy: Date;
  updatedOn: Date; 
}



