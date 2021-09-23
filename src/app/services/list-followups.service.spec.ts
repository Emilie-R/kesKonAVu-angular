import { TestBed } from '@angular/core/testing';

import { ListFollowupsService } from './list-followups.service';

describe('ListFollowupsService', () => {
  let service: ListFollowupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFollowupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
