import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { CardBaseComponent, MenuItem } from "../card-base/card-base.component";
import { Categoria } from "../../../models/categoria.model";
import { DialogCategoriaComponent } from "../../dialog-categoria/dialog-categoria.component";

@Component({
  selector: "app-card-categoria",
  standalone: true,
  imports: [CommonModule, ...materialImports],
  templateUrl: "./card-categoria.component.html",
  styleUrl: "./card-categoria.component.css",
})
export class CardCategoriaComponent extends CardBaseComponent<Categoria> {
  @Input() categoria!: Categoria;

  override getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => this.editar.emit(this.categoria),
      },
      {
        icon: "delete",
        label: "Excluir",
        action: () => this.excluir.emit(this.categoria),
      },
    ];
  }
  private dialog = inject(MatDialog);

  abrirDialog() {
    this.dialog.open(DialogCategoriaComponent, {
      width: "600px",
    });
  }
}
