import { TestBed } from '@angular/core/testing';

import { SpacelistService } from './spacelist.service';

describe('SpacelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpacelistService = TestBed.get(SpacelistService);
    expect(service).toBeTruthy();
  });
});
