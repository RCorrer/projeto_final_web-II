import { Component, inject } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { CardFuncionarioComponent } from "../card-funcionario/card-funcionario.component";
import { MatDialog } from "@angular/material/dialog";
import { DadosFuncionarioComponent } from "../dados-funcionario/dados-funcionario.component";

@Component({
  selector: "app-crud-funcionarios",
  standalone: true,
  imports: [...materialImports, NavbarComponent, CardFuncionarioComponent],
  templateUrl: "./crud-funcionarios.component.html",
  styleUrl: "./crud-funcionarios.component.css",
})
export class CrudFuncionariosComponent {
  private dialog = inject(MatDialog);
  abrirDialog() {
    this.dialog.open(DadosFuncionarioComponent, {
      width: "600px",
    });
  }
}
