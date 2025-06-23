import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectsComponent },
  {
    path: 'project/:id',
    component: TasksComponent, // eller vad din uppgiftssida heter
  },
  // fallback om någon skriver fel url
  { path: '**', redirectTo: '' },
];
