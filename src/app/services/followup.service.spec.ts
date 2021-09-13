import { TestBed } from '@angular/core/testing';

import { FollowupService } from './followup.service';

describe('FollowupService', () => {
  let service: FollowupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
