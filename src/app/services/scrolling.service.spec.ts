import { TestBed } from '@angular/core/testing';

import { ScrollingService } from './scrolling.service';

describe('ScrollingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollingService = TestBed.get(ScrollingService);
    expect(service).toBeTruthy();
  });
});
