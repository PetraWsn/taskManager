import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSideHeaderComponent } from './tasks-side-header.component';

describe('TasksSideHeaderComponent', () => {
  let component: TasksSideHeaderComponent;
  let fixture: ComponentFixture<TasksSideHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksSideHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksSideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if no deadline is provided', () => {
    expect(component.isProjectDeadlineApproaching('')).toBeFalse();
  });

  it('should return true if deadline is today', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(component.isProjectDeadlineApproaching(today)).toBeTrue();
  });

  it('should return true if deadline is within 7 days', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    const dateStr = date.toISOString().split('T')[0];
    expect(component.isProjectDeadlineApproaching(dateStr)).toBeTrue();
  });

  it('should return false if deadline is more than 7 days away', () => {
    const date = new Date();
    date.setDate(date.getDate() + 10);
    const dateStr = date.toISOString().split('T')[0];
    expect(component.isProjectDeadlineApproaching(dateStr)).toBeFalse();
  });

  it('should return true if deadline has passed', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateStr = date.toISOString().split('T')[0];
    expect(component.isProjectDeadlineApproaching(dateStr)).toBeTrue();
  });
});
