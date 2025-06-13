import { Component, inject, Input } from "@angular/core";
import { materialImports } from "../../../material-imports";
import { CommonModule } from "@angular/common";
import { CardBaseComponent, MenuItem } from "../card-base/card-base.component";
import { Funcionario } from "../../../models/funcionario.model";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-card-funcionario",
  standalone: true,
  imports: [...materialImports, CommonModule],
  templateUrl: "./card-funcionario.component.html",
  styleUrl: "./card-funcionario.component.css",
})
export class CardFuncionarioComponent extends CardBaseComponent<Funcionario> {
  private dialog = inject(MatDialog);

  @Input() funcionario!: Funcionario;

  getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => {
          console.log("Editando:", this.funcionario);
          this.editar.emit(this.funcionario);
        },
      },
      {
        icon: "delete",
        label: "Excluir",
        action: () => {
          console.log("Excluindo:", this.funcionario);
          this.excluir.emit({ ...this.funcionario }); // Passa cópia do objeto
        },
      },
    ];
  }
}
