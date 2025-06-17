import { Component, inject, Input, Output, EventEmitter } from "@angular/core";
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
    console.log('Recebido no card:', value);
    this.data = value;
  }

  get funcionario(): Funcionario {
    return this.data;
  }

  @Output() override editar = new EventEmitter<Funcionario>();
  @Output() override excluir = new EventEmitter<Funcionario>();

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