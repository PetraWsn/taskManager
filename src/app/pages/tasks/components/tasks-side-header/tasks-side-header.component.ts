import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SecondaryButtonComponent } from '../../../shared/secondary-button/secondary-button.component';
import { SideH1Component } from '../../../shared/side-h1/side-h1.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tasks-side-header',
  imports: [SecondaryButtonComponent, SideH1Component, CommonModule],
  templateUrl: './tasks-side-header.component.html',
  styleUrl: './tasks-side-header.component.scss',
})
export class TasksSideHeaderComponent {
  @Input() viewMode: 'overview' | 'create' | 'edit' | 'filter' = 'overview';
  @Input() projectName!: string;
  @Input() projectDescription!: string;
  @Input() projectDeadline!: string;
  @Input() projectTaskCount!: number;
  @Output() createTaskRequested = new EventEmitter<void>();
  @Output() startFilterRequested = new EventEmitter<void>();

  constructor(private router: Router) {}

  startCreatingTask() {
    this.createTaskRequested.emit();
  }

  startFilter() {
    this.startFilterRequested.emit();
  }

  back() {
    this.router.navigate(['/project']);
  }

  isProjectDeadlineApproaching(projectDeadline: string): boolean {
    if (!projectDeadline) {
      return false;
    }

    const deadlineDate = new Date(projectDeadline);
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
}
