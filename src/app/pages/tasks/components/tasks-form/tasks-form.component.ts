import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SecondaryButtonComponent } from '../../../shared/secondary-button/secondary-button.component';
import { HeaderListComponent } from '../../../shared/header-list/header-list.component';
import { PrimaryButtonComponent } from '../../../shared/primary-button/primary-button.component';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-tasks-form',
  imports: [
    HeaderListComponent,
    FormsModule,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CommonModule,
  ],
  templateUrl: './tasks-form.component.html',
  styleUrl: './tasks-form.component.scss',
})
export class TasksFormComponent implements OnInit, OnChanges {
  @Input() task: Task | null = null;
  @Input() isEditMode: boolean = false;

  @Output() taskSaved = new EventEmitter<Task>();
  @Output() formClosed = new EventEmitter<void>();

  newTask: Task = this.getEmptyTask();
  tagInput: string = '';

  ngOnInit() {
    this.initTask();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.initTask();
    }
  }

  private initTask() {
    if (this.task) {
      this.newTask = { ...this.task };
    } else {
      this.newTask = this.getEmptyTask();
    }
    this.tagInput = '';
  }

  getEmptyTask(): Task {
    return {
      id: 0,
      name: '',
      description: '',
      deadline: '',
      status: 'noStart',
      priority: 'none',
      tags: [],
    };
  }

  saveTask(form: NgForm) {
    if (form.valid) {
      const taskToSave: Task = {
        ...this.newTask,
        id: this.isEditMode && this.task ? this.task.id : Date.now(),
      };

      this.taskSaved.emit(taskToSave);
      this.newTask = this.getEmptyTask();
      this.tagInput = '';
    }
  }

  closeForm() {
    this.formClosed.emit();
  }

  addTag() {
    const tag = this.tagInput.trim();
    if (tag && !this.newTask.tags.includes(tag)) {
      this.newTask.tags.push(tag);
      this.tagInput = '';
    }
  }

  onEnterPress(event: Event) {
    event.preventDefault();
    this.addTag();
  }

  removeTag(index: number) {
    this.newTask.tags.splice(index, 1);
  }
}
