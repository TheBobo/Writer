import { TestBed, inject } from '@angular/core/testing';

import { ActsService } from './acts.service';

describe('ActsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActsService]
    });
  });

  it('should ...', inject([ActsService], (service: ActsService) => {
    expect(service).toBeTruthy();
  }));
});
