import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsSignal = signal<Project[]>([]);
  private apiUrl = 'https://mocki.io/v1/436484be-0f07-46ca-9e62-1d8845360f2a';
  private storageKey = 'projectsData';

  constructor(private http: HttpClient) {
    this.loadProjects();
  }

  private loadProjects(): void {
    const saved = sessionStorage.getItem(this.storageKey);
    if (saved) {
      // Läs från sessionStorage om data finns
      const projects: Project[] = JSON.parse(saved);
      this.projectsSignal.set(projects);
      console.log('ProjectService: Projekt laddade från sessionStorage');
    } else {
      // Annars hämta från API och spara i sessionStorage
      this.http.get<Project[]>(this.apiUrl).subscribe({
        next: (projects) => {
          this.projectsSignal.set(projects);
          sessionStorage.setItem(this.storageKey, JSON.stringify(projects));
          console.log(
            'ProjectService: Projekt laddade från API och sparade i sessionStorage'
          );
        },
        error: (error) => {
          console.error('Kunde inte hämta projekt från API:', error);
        },
      });
    }
  }

  private saveToSessionStorage(projects: Project[]): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

  getAllProjects() {
    return this.projectsSignal.asReadonly();
  }

  addProject(project: Project): void {
    // Hitta max id i den aktuella listan
    const currentProjects = this.projectsSignal();
    const maxId =
      currentProjects.length > 0
        ? Math.max(...currentProjects.map((p) => p.id))
        : 0;

    // Sätt nytt id till maxId + 1
    const newProject = { ...project, id: maxId + 1 };

    // Lägg till projektet i signalen
    const updated = [...currentProjects, newProject];
    this.projectsSignal.set(updated);

    // Spara i sessionStorage
    this.saveToSessionStorage(updated);

    console.log('Projekt tillagt med nytt id:', newProject);
  }

  getProjectById(projectId: number): Project | undefined {
    return this.projectsSignal().find((p) => p.id === projectId);
  }

  addTaskToProject(projectId: number, task: Task): void {
    const project = this.getProjectById(projectId);
    if (!project) return;

    const updatedProject: Project = {
      ...project,
      tasks: [...project.tasks, task],
    };

    this.updateProject(updatedProject);
  }

  updateTaskInProject(projectId: number, updatedTask: Task): void {
    const project = this.getProjectById(projectId);
    if (!project) return;

    const updatedTasks = project.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    const updatedProject: Project = {
      ...project,
      tasks: updatedTasks,
    };

    this.updateProject(updatedProject);
  }

  updateProject(updatedProject: Project): void {
    const updated = this.projectsSignal().map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    this.projectsSignal.set(updated);
    this.saveToSessionStorage(updated);
    console.log(
      'Projekt uppdaterat lokalt och sparat i sessionStorage:',
      updatedProject
    );
  }

  deleteProjectById(projectId: number): void {
    const updated = this.projectsSignal().filter((p) => p.id !== projectId);
    this.projectsSignal.set(updated);
    this.saveToSessionStorage(updated);
    console.log(
      `Projekt med id ${projectId} borttaget och ändringar sparade i sessionStorage.`
    );
  }
}
