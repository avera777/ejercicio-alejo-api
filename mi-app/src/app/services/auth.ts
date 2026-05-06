import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login() {
    localStorage.setItem('token', 'logueado');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }
}