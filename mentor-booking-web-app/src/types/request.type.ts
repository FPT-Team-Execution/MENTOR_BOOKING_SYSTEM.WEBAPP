import { StudentType } from '../types/user.types';

export type RequestType = {
    id: string;
    title: string;
    calendarEventId?: string;
    projectId: string;
    createrId: string;
    creater?: StudentType;
    status: number;
    createdBy: string;
    createdOn: string;
    updatedBy?: string;
    updatedOn?: string;
    start: string;
    end: string;
}