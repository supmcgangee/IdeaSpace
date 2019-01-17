import { TestBed } from '@angular/core/testing';

import { WorkSpaceService } from './work-space.service';

describe('WorkSpaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkSpaceService = TestBed.get(WorkSpaceService);
    expect(service).toBeTruthy();
  });
});
