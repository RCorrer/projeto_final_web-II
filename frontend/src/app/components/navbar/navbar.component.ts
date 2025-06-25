import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [...materialImports, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rotaInicial: string = '/';

  constructor(public authService: AuthService, private router: Router) {
    this.definirRotaInicial();
  }

  definirRotaInicial(): void {
    if (this.authService.isCliente()) {
      this.rotaInicial = '/home-cliente';
    } else if (this.authService.isFuncionario()) {
      this.rotaInicial = '/home';
    } else {
      this.rotaInicial = '/'; // fallback
    }
  }

  logout(): void {
    this.authService.logout();
  }
}

