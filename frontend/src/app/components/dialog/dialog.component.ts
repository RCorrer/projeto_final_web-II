import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { materialImports } from "../../material-imports";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-dialog-confirm",
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <mat-dialog-content>{{ data.mensagem }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-button color="primary" [mat-dialog-close]="true">Confirmar</button>
    </mat-dialog-actions>
  `,
  imports: [...materialImports, CommonModule],
})
export class DialogConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string }) {}
}
