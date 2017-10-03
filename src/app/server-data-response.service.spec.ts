import { TestBed, inject } from '@angular/core/testing';

import { ServerDataResponseService } from './server-data-response.service';

describe('ServerDataResponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerDataResponseService]
    });
  });

  it('should ...', inject([ServerDataResponseService], (service: ServerDataResponseService) => {
    expect(service).toBeTruthy();
  }));
});
