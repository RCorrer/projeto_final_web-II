import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../../material-imports";
import { CardBaseComponent, CardBaseTemplateComponent, MenuItem } from '../card-base';

@Component({
  selector: "app-card-categoria",
  standalone: true,
  imports: [CommonModule, ...materialImports, CardBaseTemplateComponent],
  templateUrl: "./card-categoria.component.html",
  styleUrl: "./card-categoria.component.css",
})
export class CardCategoriaComponent extends CardBaseComponent<string> {
  override getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => this.editar.emit(this.data),
      },
      {
        icon: "edit",
        label: "Editar",
        action: () => this.excluir.emit(this.data),
      },
    ];
  }
}
