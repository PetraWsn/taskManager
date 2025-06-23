export interface TaskFilter {
  priority?: 'low' | 'medium' | 'high';
  deadlineBefore?: Date;
  deadlineAfter?: Date;
}
