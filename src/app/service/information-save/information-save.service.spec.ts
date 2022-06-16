import { TestBed } from '@angular/core/testing';

import { InformationSaveService } from './information-save.service';

describe('InformationSaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InformationSaveService = TestBed.get(InformationSaveService);
    expect(service).toBeTruthy();
  });
});
