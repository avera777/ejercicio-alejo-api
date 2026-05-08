import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    if (
      this.usuario === 'admin' &&
      this.password === '123456'
    ) {

      this.authService.login(this.usuario, this.password);

      this.router.navigate(['/']);

    } else {

      alert('Usuario o contraseña incorrectos');

    }
  }
}