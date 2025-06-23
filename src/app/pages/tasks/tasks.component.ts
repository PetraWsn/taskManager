import { Component, OnInit, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksSideHeaderComponent } from './components/tasks-side-header/tasks-side-header.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TasksSideHeaderComponent,
    CommonModule,
    FormsModule,
    TasksListComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  pageClass = 'loggedIn-background';
  viewMode: 'overview' | 'create' | 'edit' | 'filter' = 'overview';
  selectedTask: Task | null = null;

  projectId!: number;
  project!: Signal<Project | undefined>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.projectId = +idParam;

      this.project = computed(() =>
        this.projectService
          .getAllProjects()()
          .find((p) => p.id === this.projectId)
      );

      if (!this.project()) {
        console.warn(`Projekt med id ${this.projectId} hittades inte.`);
      }
    } else {
      console.error('Inget projekt-ID hittades i URL.');
    }
  }

  openCreateForm() {
    this.selectedTask = null;
    this.viewMode = 'create';
  }

  openFilterForm() {
    this.selectedTask = null;
    this.viewMode = 'filter';
  }

  openEditForm(task: Task) {
    this.selectedTask = task;
    this.viewMode = 'edit';
  }

  closeForm() {
    this.selectedTask = null;
    this.viewMode = 'overview';
  }

  handleTaskSaved(task: Task) {
    if (this.viewMode === 'create') {
      this.projectService.addTaskToProject(this.projectId, task);
    } else if (this.viewMode === 'edit') {
      this.projectService.updateTaskInProject(this.projectId, task);
    } else {
      console.warn('Okänd viewMode vid spara av uppgift.');
      return;
    }

    this.closeForm();
  }
}
