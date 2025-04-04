import { Component, inject } from "@angular/core";
import { materialImports } from "../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { PrimeiroDialogComponent } from "../primeiro-dialog/primeiro-dialog.component";

@Component({
  selector: "app-card-funcionario",
  standalone: true,
  imports: [...materialImports],
  templateUrl: "./card-funcionario.component.html",
  styleUrl: "./card-funcionario.component.css",
})
export class CardFuncionarioComponent {
  private dialog = inject(MatDialog);

  abrirPrimeiroDialog(): void {
    this.dialog.open(PrimeiroDialogComponent);
  }
}
