import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { DadosEquipamentoComponent } from "../../dados-equipamento/dados-equipamento.component";
import { CardBaseComponent, MenuItem } from "../card-base/card-base.component";
import { Equipamento } from "../../../models/equipamento.model";

@Component({
  selector: "app-card-equipamento",
  standalone: true,
  imports: [CommonModule, ...materialImports],
  templateUrl: "./card-equipamento.component.html",
  styleUrl: "./card-equipamento.component.css",
})
export class CardEquipamentoComponent extends CardBaseComponent<Equipamento> {
  @Input() equipamento!: Equipamento;

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

  abrirDialog() {
    this.dialog.open(DadosEquipamentoComponent, {
      width: "600px",
    });
  }
}
