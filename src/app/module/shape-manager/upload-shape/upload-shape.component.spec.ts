import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadShapeComponent } from './upload-shape.component';

describe('UploadShapeComponent', () => {
  let component: UploadShapeComponent;
  let fixture: ComponentFixture<UploadShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadShapeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
