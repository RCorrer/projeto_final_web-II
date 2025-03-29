import { Component } from '@angular/core';
import { materialImports } from '../../material-imports';

@Component({
  selector: 'app-navbar',
  imports: [...materialImports],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}
