import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [...materialImports, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
  
}
