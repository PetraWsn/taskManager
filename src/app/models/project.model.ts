import { Task } from './task.model';

// project.model.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  deadline: string;
  tasks: Task[]; // tom array i början
}
