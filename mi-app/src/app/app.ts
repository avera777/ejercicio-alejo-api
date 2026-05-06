import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { Header } from './layout/header/header';
import { Sidebar } from './layout/sidebar/sidebar';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  constructor(private router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

}