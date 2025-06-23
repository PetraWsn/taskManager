import { Component, OnInit, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectSideHeaderComponent } from './components/project-side-header/project-side-header.component';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    FormsModule,
    ProjectListComponent,
    CommonModule,
    ProjectSideHeaderComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  pageClass = 'loggedIn-background';
  viewMode: 'overview' | 'create' | 'edit' = 'overview';
  selectedProject: Project | null = null;

  allProjects!: Signal<Project[]>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.allProjects = this.projectService.getAllProjects();
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Navigerad till projekt med ID:', id);
  }

  openCreateForm() {
    this.selectedProject = null;
    this.viewMode = 'create';
  }

  openEditForm(project: Project) {
    this.selectedProject = project;
    this.viewMode = 'edit';
  }

  closeForm() {
    this.selectedProject = null;
    this.viewMode = 'overview';
  }

  handleProjectSaved(project: Project) {
    if (this.viewMode === 'create') {
      this.projectService.addProject(project);
    } else {
      this.projectService.updateProject(project);
    }

    this.closeForm();
  }

  handleProjectDeleted(projectId: number) {
    this.projectService.deleteProjectById(projectId);
    this.closeForm();
  }
}
