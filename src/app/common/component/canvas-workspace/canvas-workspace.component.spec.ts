import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasWorkspaceComponent } from './canvas-workspace.component';

describe('CanvasWorkspaceComponent', () => {
  let component: CanvasWorkspaceComponent;
  let fixture: ComponentFixture<CanvasWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasWorkspaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanvasWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
