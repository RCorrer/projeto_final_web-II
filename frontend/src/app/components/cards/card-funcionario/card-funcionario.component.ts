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

  @Input() set funcionario(value: Funcionario) {
    this.data = value;
  }

  get funcionario(): Funcionario {
    return this.data;
  }

  override getMenuItems(): MenuItem[] {
    return [
      {
        icon: "edit",
        label: "Editar",
        action: () => this.editar.emit(this.data),
        color: "primary",
      },
      {
        icon: "delete",
        label: "Excluir",
        action: () => this.excluir.emit(this.data),
        color: "warn",
      },
    ];
  }
}
