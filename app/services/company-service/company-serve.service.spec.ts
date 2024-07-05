import { TestBed } from '@angular/core/testing';

import { CompanyServeService } from './company-serve.service';

describe('CompanyServeService', () => {
  let service: CompanyServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
