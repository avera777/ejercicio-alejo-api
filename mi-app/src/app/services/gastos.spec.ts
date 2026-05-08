import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { GastosService } from './gastos';

describe('GastosService', () => {
  let service: GastosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    service = TestBed.inject(GastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});