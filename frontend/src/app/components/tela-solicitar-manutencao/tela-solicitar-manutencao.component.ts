import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-tela-solicitar-manutencao',
  imports: [CommonModule, MatButtonModule, NavbarComponent, MatFormField, MatLabel, MatInputModule, MatSelect, MatOption],
  templateUrl: './tela-solicitar-manutencao.component.html',
  styleUrl: './tela-solicitar-manutencao.component.css'
})
export class TelaSolicitarManutencaoComponent {

}
