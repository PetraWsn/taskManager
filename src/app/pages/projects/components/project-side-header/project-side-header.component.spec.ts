import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSideHeaderComponent } from './project-side-header.component';

describe('ProjectSideHeaderComponent', () => {
  let component: ProjectSideHeaderComponent;
  let fixture: ComponentFixture<ProjectSideHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSideHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSideHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
