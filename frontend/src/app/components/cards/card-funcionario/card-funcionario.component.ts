import { Component, inject, Input } from "@angular/core";
import { materialImports } from "../../../material-imports";
import { CommonModule } from "@angular/common";
import { CardBaseComponent, MenuItem } from "../card-base/card-base.component";
import { Funcionario } from "../../../models/funcionario.model";
import { MatDialog } from "@angular/material/dialog";
import { DadosEquipamentoComponent } from "../../dados-equipamento/dados-equipamento.component";

@Component({
  selector: "app-card-funcionario",
  standalone: true,
  imports: [...materialImports, CommonModule],
  templateUrl: "./card-funcionario.component.html",
  styleUrl: "./card-funcionario.component.css",
})
export class CardFuncionarioComponent extends CardBaseComponent<Funcionario> {
  private dialog = inject(MatDialog);

  abrirDialog() {
    this.dialog.open(DadosEquipamentoComponent, {
      width: "600px",
    });
  }
  @Input() funcionario!: Funcionario;
  override getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => this.editar.emit(this.funcionario),
      },
      {
        icon: "delete",
        label: "Excluir",
        action: () => this.excluir.emit(this.funcionario),
      },
    ];
  }
}
