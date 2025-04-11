import { Component, Input } from '@angular/core';
import { materialImports } from '../../../material-imports';
import { MenuItem } from '../card-base/card-base.component';

@Component({
  standalone: true,
  selector: 'app-card-base-template',
  imports: [...materialImports],
  templateUrl: './card-base-template.component.html',
  styleUrl: './card-base-template.component.css'
})
export class CardBaseTemplateComponent {
  // Define a lista de itens do menu como uma propriedade de entrada
  // Isso permite que o componente receba os itens do menu de um componente pai
  @Input() menuItems: MenuItem[] = [];
}
