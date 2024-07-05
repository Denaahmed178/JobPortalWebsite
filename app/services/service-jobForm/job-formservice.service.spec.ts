import { TestBed } from '@angular/core/testing';

import { JobFormserviceService } from './job-formservice.service';

describe('JobFormserviceService', () => {
  let service: JobFormserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobFormserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
