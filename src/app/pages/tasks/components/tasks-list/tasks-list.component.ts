import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderListComponent } from '../../../shared/header-list/header-list.component';
import { ContentWrapperComponent } from '../../../shared/content-wrapper/content-wrapper.component';
import { TasksFormComponent } from '../tasks-form/tasks-form.component';
import { TaskCardContainerComponent } from '../task-card-container/task-card-container.component';
import { TasksFilterFormComponent } from '../tasks-filter-form/tasks-filter-form.component';

import { Task } from '../../../../models/task.model';
import { Project } from '../../../../models/project.model';
import { TaskFilter } from '../../../../models/taskFilter.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderListComponent,
    ContentWrapperComponent,
    TasksFormComponent,
    TaskCardContainerComponent,
    TasksFilterFormComponent,
  ],
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent {
  @Input() viewMode: 'overview' | 'create' | 'edit' | 'filter' = 'overview';
  @Input() selectedTask: Task | null = null;
  @Input() project?: Project;

  @Output() formClosed = new EventEmitter<void>();
  @Output() taskSaved = new EventEmitter<Task>();
  @Output() editTaskRequested = new EventEmitter<Task>();

  // Lägg till eller uppdatera en task i projektet
  addOrUpdateTask(task: Task) {
    this.taskSaved.emit(task);
  }

  closeForm() {
    this.selectedTask = null;
    this.formClosed.emit();
  }

  filter: TaskFilter = {};

  onFilterChanged(newFilter: TaskFilter) {
    this.filter = newFilter;
  }

  applyFilter(tasks: Task[]): Task[] {
    return tasks.filter((task) => {
      const matchesPriority =
        !this.filter.priority || task.priority === this.filter.priority;
      const deadline = new Date(task.deadline);

      const matchesAfter =
        !this.filter.deadlineAfter || deadline >= this.filter.deadlineAfter;

      const matchesBefore =
        !this.filter.deadlineBefore || deadline <= this.filter.deadlineBefore;

      return matchesPriority && matchesAfter && matchesBefore;
    });
  }

  get notStartedTasks() {
    return this.applyFilter(
      this.project?.tasks.filter((t) => t.status === 'noStart') || []
    );
  }

  get startedTasks() {
    return this.applyFilter(
      this.project?.tasks.filter((t) => t.status === 'Started') || []
    );
  }

  get doneTasks() {
    return this.applyFilter(
      this.project?.tasks.filter((t) => t.status === 'Done') || []
    );
  }

  // Öppna formulär i edit mode med vald task
  openFormWithTask(task: Task) {
    this.editTaskRequested.emit(task);
  }
}
