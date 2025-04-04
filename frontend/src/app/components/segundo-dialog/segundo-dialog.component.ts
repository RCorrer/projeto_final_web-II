import { Component } from "@angular/core";
import { materialImports } from "../../material-imports";

@Component({
  selector: "app-segundo-dialog",
  standalone: true,
  imports: [...materialImports],
  template: `
    <h1 mat-dialog-title>Segundo Dialog</h1>
    <div mat-dialog-content>Este é o segundo dialog aberto.</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
    </div>
  `,
})
export class SegundoDialogComponent {}
