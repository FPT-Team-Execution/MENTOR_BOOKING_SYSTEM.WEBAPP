import { User } from "./user.types";

export type Major = {
  id: string;
  name: string;
  createdOn: Date;
  parentId: string | undefined;
  parentName: string | undefined;
  updatedOn: Date;
  status: string;
};

export interface MentorInSkill {
  userId: string;
  user: User;
  industry: string;
  consumePoint: number;
}

export type SkillSummary = {
  id: string;
  name: string;
  mentorId: string;
  mentorEmail: string;
  mentorName: string;

};
export type Skill = {
  id: string;
  name: string;
  mentorId: string;
  mentor: MentorInSkill;
};
