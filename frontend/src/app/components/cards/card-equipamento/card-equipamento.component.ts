import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { CardBaseComponent, MenuItem } from "../card-base/card-base.directive";
import { Categoria } from "../../../models/categoria.model";

@Component({
  selector: "app-card-equipamento",
  standalone: true,
  imports: [CommonModule, ...materialImports],
  templateUrl: "./card-equipamento.component.html",
  styleUrl: "./card-equipamento.component.css",
})
export class CardEquipamentoComponent extends CardBaseComponent<Categoria> {
  @Input() equipamento!: Categoria;

  override getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => this.editar.emit(this.equipamento),
      },
      {
        icon: "delete",
        label: "Excluir",
        action: () => this.excluir.emit(this.equipamento),
      },
    ];
  }
  private dialog = inject(MatDialog);
}
