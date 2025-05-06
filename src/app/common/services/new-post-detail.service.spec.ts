import { TestBed } from '@angular/core/testing';

import { NewPostDetailService } from './new-post-detail.service';

describe('NewPostDetailService', () => {
  let service: NewPostDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPostDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
