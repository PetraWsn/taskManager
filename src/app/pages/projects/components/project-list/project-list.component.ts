import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentWrapperComponent } from '../../../shared/content-wrapper/content-wrapper.component';
import { HeaderListComponent } from '../../../shared/header-list/header-list.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { RouterModule } from '@angular/router';
import { Project } from '../../../../models/project.model';
import { NbProgressBarModule } from '@nebular/theme';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderListComponent,
    ContentWrapperComponent,
    ProjectFormComponent,
    RouterModule,

    NbProgressBarModule,
  ],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  @Input() viewMode: 'overview' | 'create' | 'edit' = 'overview';
  @Input() selectedProject: Project | null = null;
  @Input() projects: Project[] = [];

  @Output() formClosed = new EventEmitter<void>();
  @Output() projectSaved = new EventEmitter<Project>();
  @Output() editProjectRequested = new EventEmitter<Project>();
  @Output() projectDeleted = new EventEmitter<number>();

  addOrUpdateProject(project: Project) {
    this.projectSaved.emit(project);
  }

  updateDeletedProject(projectId: number) {
    this.projectDeleted.emit(projectId);
  }

  closeForm() {
    this.selectedProject = null;
    this.formClosed.emit();
  }

  openFormWithProject(project: Project) {
    this.editProjectRequested.emit(project);
  }

  private originalProjects: Project[] = [];
  sortedProjects: Project[] = [];

  currentSort = {
    field: '',
    direction: 0,
  };

  getSortIcon(field: string): string {
    if (this.currentSort.field !== field || this.currentSort.direction === 0) {
      return '../../../../../assets/icon_sort_neutral.svg';
    }
    return this.currentSort.direction === 1
      ? '../../../../../assets/icon_sort_up.svg'
      : '../../../../../assets/icon_sort_down.svg';
  }

  ngOnChanges() {
    this.originalProjects = [...this.projects];
    this.sortedProjects = [...this.projects];
  }

  isProjectDeadlineApproaching(project: Project): boolean {
    if (!project.deadline) {
      return false;
    }

    const deadlineDate = new Date(project.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    sevenDaysFromNow.setHours(0, 0, 0, 0);

    return (
      deadlineDate < today ||
      (deadlineDate >= today && deadlineDate <= sevenDaysFromNow)
    );
  }

  sortBy(field: 'name' | 'deadline' | 'tasks') {
    if (this.currentSort.field === field) {
      // Cykla genom neutral -> ascending -> descending -> neutral
      this.currentSort.direction = ((this.currentSort.direction + 2) % 3) - 1;
    } else {
      this.currentSort = { field, direction: 1 }; // Starta med ascending
    }

    const direction = this.currentSort.direction;

    if (direction === 0) {
      this.sortedProjects = [...this.originalProjects];
    } else {
      this.sortedProjects = [...this.projects].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (field) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'deadline':
            aValue = new Date(a.deadline).getTime();
            bValue = new Date(b.deadline).getTime();
            break;
          case 'tasks':
            aValue = a.tasks.length;
            bValue = b.tasks.length;
            break;
        }

        return direction * (aValue > bValue ? 1 : aValue < bValue ? -1 : 0);
      });
    }
  }

  getProjectCompletion(project: Project): number {
    const totalTasks = project.tasks.length;
    if (totalTasks === 0) return 0;

    const completedTasks = project.tasks.filter(
      (task) => task.status === 'Done'
    ).length;
    return Math.round((completedTasks / totalTasks) * 100);
  }

  getProgressStatus(project: Project): 'danger' | 'warning' | 'success' {
    const percentage = this.getProjectCompletion(project);

    if (percentage < 20) {
      return 'danger';
    } else if (percentage < 80) {
      return 'warning';
    } else {
      return 'success';
    }
  }
}
