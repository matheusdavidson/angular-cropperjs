import { TestBed, inject } from '@angular/core/testing';

import { AngularCropperjsService } from './angular-cropperjs.service';

describe('AngularCropperjsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularCropperjsService]
    });
  });

  it('should be created', inject([AngularCropperjsService], (service: AngularCropperjsService) => {
    expect(service).toBeTruthy();
  }));
});
