import { TestBed } from '@angular/core/testing';

import { IdeaCardService } from './idea-card.service';

describe('IdeaCardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdeaCardService = TestBed.get(IdeaCardService);
    expect(service).toBeTruthy();
  });
});
