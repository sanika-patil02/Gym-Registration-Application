import { TestBed } from '@angular/core/testing';

import { SharedsericeService } from './sharedserice.service';

describe('SharedsericeService', () => {
  let service: SharedsericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
