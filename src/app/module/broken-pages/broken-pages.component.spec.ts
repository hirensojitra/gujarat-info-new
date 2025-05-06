import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenPagesComponent } from './broken-pages.component';

describe('BrokenPagesComponent', () => {
  let component: BrokenPagesComponent;
  let fixture: ComponentFixture<BrokenPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrokenPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokenPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
