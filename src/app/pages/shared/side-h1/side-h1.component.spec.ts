import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideH1Component } from './side-h1.component';

describe('SideH1Component', () => {
  let component: SideH1Component;
  let fixture: ComponentFixture<SideH1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideH1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideH1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
