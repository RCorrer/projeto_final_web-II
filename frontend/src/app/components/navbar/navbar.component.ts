import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [...materialImports, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
  
}
