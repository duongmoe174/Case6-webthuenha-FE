import { TestBed, async, inject } from '@angular/core/testing';

import { HostAuthGuard } from './host-auth.guard';

describe('HostAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HostAuthGuard]
    });
  });

  it('should ...', inject([HostAuthGuard], (guard: HostAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
