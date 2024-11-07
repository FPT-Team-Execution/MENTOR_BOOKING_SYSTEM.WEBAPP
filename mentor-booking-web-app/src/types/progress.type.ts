export type ProgressType = {
  id: string,
  name: string;
  projectId: string;
  createdBy?: string;
  isComplete: boolean;
  createdOn?: Date;
}

export type GetCompleteProgressRequest = {
  projectId: string;
};

export type GetCompleteProgressResponse = {
  percent: number;
  complete: ProgressType[];
  notComplete: ProgressType[];
};