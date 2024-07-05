import { TestBed } from '@angular/core/testing';

import { HomeApplicantService } from './home-applicant.service';

describe('HomeApplicantService', () => {
  let service: HomeApplicantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeApplicantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
