import { GetCompleteProgressResponse } from "./progress.type";

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  semester: string;
  createdBy?: string;
  mentorId: string;
  status: string;
  progress: GetCompleteProgressResponse
}