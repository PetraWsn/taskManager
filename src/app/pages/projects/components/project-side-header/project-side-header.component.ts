import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondaryButtonComponent } from '../../../shared/secondary-button/secondary-button.component';
import { SideH1Component } from '../../../shared/side-h1/side-h1.component';

@Component({
  selector: 'app-project-side-header',
  standalone: true,
  imports: [SecondaryButtonComponent, CommonModule, SideH1Component],
  templateUrl: './project-side-header.component.html',
  styleUrl: './project-side-header.component.scss',
})
export class ProjectSideHeaderComponent {
  @Input() viewMode: 'overview' | 'create' | 'edit' = 'overview';
  @Input() projectName!: string;
  @Output() createProjectRequested = new EventEmitter<void>();

  startCreatingProject() {
    this.createProjectRequested.emit();
  }
}
