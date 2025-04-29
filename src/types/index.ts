
export interface User {
  id: string;
  email: string;
  name: string;
  country: string;
}

export type AuthUser = User & {
  token: string;
};

export interface Project {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED"
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  createdAt: string;
  completedAt: string | null;
}
