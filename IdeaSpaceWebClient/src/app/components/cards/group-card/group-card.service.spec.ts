import { TestBed } from '@angular/core/testing';

import { GroupCardService } from './group-card.service';

describe('GroupCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupCardService = TestBed.get(GroupCardService);
    expect(service).toBeTruthy();
  });
});
