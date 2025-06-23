import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-card-container',
  imports: [CommonModule],
  templateUrl: './task-card-container.component.html',
  styleUrl: './task-card-container.component.scss',
})
export class TaskCardContainerComponent {
  @Input() task!: Task;
  @Input() isDone: boolean = false;
  @Output() editTaskRequested = new EventEmitter<Task>();

  onCardClick() {
    this.editTaskRequested.emit(this.task);
  }

  isDeadlineApproaching(): boolean {
    if (!this.task.deadline) {
      return false;
    }

    const deadlineDate = new Date(this.task.deadline);
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

  getPriorityColor(): string {
    if (this.isDone) {
      return '#E2F3D5'; // Ljusgrön färg för klara uppgifter
    }
    switch (this.task.priority) {
      case 'high':
        return '#FFDCD5'; // Röd
      case 'medium':
        return '#FFE4CB'; // Orange
      case 'low':
        return '#FCF6D1'; // Gul
      default:
        return '#F8F5ED'; // Grå
    }
  }

  getPriorityColorBorder(): string {
    if (this.isDone) {
      return '#E2F3D5';
    }
    if (this.isDeadlineApproaching()) {
      return '#FF0000';
    }

    return '#F8F5ED';
  }

  getTranslatedPriority(priority: string | undefined): string {
    switch (priority) {
      case 'high':
        return 'Hög';
      case 'medium':
        return 'Medel';
      case 'low':
        return 'Låg';
      default:
        return '---';
    }
  }
}
