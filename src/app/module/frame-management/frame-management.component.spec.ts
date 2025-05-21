import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameManagementComponent } from './frame-management.component';

describe('FrameManagementComponent', () => {
  let component: FrameManagementComponent;
  let fixture: ComponentFixture<FrameManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
