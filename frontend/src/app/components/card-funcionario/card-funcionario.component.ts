import { Component, inject } from "@angular/core";
import { materialImports } from "../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { DadosFuncionarioComponent } from "../dados-funcionario/dados-funcionario.component";

@Component({
  selector: "app-card-funcionario",
  standalone: true,
  imports: [...materialImports],
  templateUrl: "./card-funcionario.component.html",
  styleUrl: "./card-funcionario.component.css",
})
export class CardFuncionarioComponent {
  private dialog = inject(MatDialog);

  editar() {
    console.log("Editar funcionário");
  }

  excluir() {
    console.log("Excluir funcionário");
  }

  abrirDialog() {
    this.dialog.open(DadosFuncionarioComponent, {
      width: "600px",
    });
  }
}
