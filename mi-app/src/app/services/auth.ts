import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:5127/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(usuario: string, password: string) {

    const body = {
      usuario,
      password
    };

    this.http.post<any>(this.apiUrl, body)
      .subscribe({
        next: (response) => {

          localStorage.setItem('token', response.token);

          this.router.navigate(['/']);

        },
        error: () => {

          alert('Usuario o contraseña incorrectos');

        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}