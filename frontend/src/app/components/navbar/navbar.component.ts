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

  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
  }
  
}
