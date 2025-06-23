import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SecondaryButtonComponent } from '../../../shared/secondary-button/secondary-button.component';
import { HeaderListComponent } from '../../../shared/header-list/header-list.component';
import { PrimaryButtonComponent } from '../../../shared/primary-button/primary-button.component';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    HeaderListComponent,
    FormsModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
  ],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit, OnChanges {
  @Input() project: Project | null = null;

  @Input() viewMode: 'create' | 'edit' = 'create';

  @Output() projectSaved = new EventEmitter<Project>();
  @Output() formClosed = new EventEmitter<void>();
  @Output() deletedProject = new EventEmitter<number>();

  newProject: Project = this.getEmptyProject();

  ngOnInit() {
    this.initProject();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['project']) {
      this.initProject();
    }
  }

  private initProject() {
    if (this.project) {
      this.newProject = { ...this.project };
    } else {
      this.newProject = this.getEmptyProject();
    }
  }

  getEmptyProject(): Project {
    return {
      id: 0,
      name: '',
      description: '',
      deadline: '',
      tasks: [],
    };
  }

  saveProject(form: any) {
    if (form.valid) {
      const projectToSave: Project = {
        ...this.newProject,
        id:
          this.viewMode === 'edit' && this.project
            ? this.project.id
            : Date.now(),
      };
      this.projectSaved.emit(projectToSave);
    }
  }

  onSecondaryButtonClick() {
    if (this.viewMode === 'create') {
      // Stäng formuläret
      this.formClosed.emit();
    } else if (this.viewMode === 'edit') {
      // Bekräfta och radera
      if (confirm('Är du säker på att du vill radera projektet?')) {
        if (this.project) {
          this.deletedProject.emit(this.project.id);
        }
      }
    }
  }
}
