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
import { CommonModule } from '@angular/common';
import { TaskFilter } from '../../../../models/taskFilter.model';
import { HeaderListComponent } from '../../../shared/header-list/header-list.component';
import { SecondaryButtonComponent } from '../../../shared/secondary-button/secondary-button.component';
import { PrimaryButtonComponent } from '../../../shared/primary-button/primary-button.component';
@Component({
  selector: 'app-tasks-filter-form',
  imports: [
    FormsModule,
    HeaderListComponent,
    SecondaryButtonComponent,
    PrimaryButtonComponent,
    CommonModule,
  ],
  templateUrl: './tasks-filter-form.component.html',
  styleUrl: './tasks-filter-form.component.scss',
})
export class TasksFilterFormComponent implements OnChanges {
  @Input() currentFilter: TaskFilter = {};
  @Output() filterChanged = new EventEmitter<TaskFilter>();
  @Output() formClosed = new EventEmitter<void>();

  priority?: 'low' | 'medium' | 'high';
  deadlineAfter?: string;
  deadlineBefore?: string;

  applyFilter() {
    this.filterChanged.emit({
      priority: this.priority as any,
      deadlineAfter: this.deadlineAfter
        ? new Date(this.deadlineAfter)
        : undefined,
      deadlineBefore: this.deadlineBefore
        ? new Date(this.deadlineBefore)
        : undefined,
    });

    this.formClosed.emit();
  }

  clearFilter() {
    this.priority = undefined;
    this.deadlineAfter = undefined;
    this.deadlineBefore = undefined;

    this.filterChanged.emit({}); // skickar tomt filter
    this.formClosed.emit(); // stänger formuläret
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentFilter'] && this.currentFilter) {
      this.priority = this.currentFilter.priority;
      this.deadlineAfter = this.currentFilter.deadlineAfter
        ? this.currentFilter.deadlineAfter.toISOString().split('T')[0]
        : undefined;
      this.deadlineBefore = this.currentFilter.deadlineBefore
        ? this.currentFilter.deadlineBefore.toISOString().split('T')[0]
        : undefined;
    }
  }
}
