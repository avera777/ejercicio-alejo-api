import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize usuario empty', () => {
    expect(component.usuario).toBe('');
  });

  it('should initialize password empty', () => {
    expect(component.password).toBe('');
  });

  it('should have login method', () => {
    expect(component.login).toBeTruthy();
  });
});