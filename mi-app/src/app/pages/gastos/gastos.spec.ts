import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Gastos } from './gastos';
import { GastosService } from '../../services/gastos';
import { SignalrService } from '../../services/signalr';

describe('Gastos', () => {
  let component: Gastos;
  let fixture: ComponentFixture<Gastos>;

  const gastosServiceMock = {
    getGastos: () => of([]),
    agregarGasto: () => of({}),
    actualizarGasto: () => of({}),
    eliminarGasto: () => of({})
  };

  const signalrServiceMock = {
    startConnection: () => Promise.resolve(),
    onExpensesUpdated: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gastos],
      providers: [
        { provide: GastosService, useValue: gastosServiceMock },
        { provide: SignalrService, useValue: signalrServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Gastos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});