// dialog-funcionario.component.ts
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../material-imports";

@Component({
  selector: "app-dialog-funcionario",
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ data.titulo }}</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Nome</mat-label>
        <input matInput [(ngModel)]="data.nome" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Senha</mat-label>
        <input matInput [(ngModel)]="data.senha" type="password" />
      </mat-form-field>
      <mat-form-field appearance="fill" class="w-full">
        <mat-label>Data de Nascimento</mat-label>
        <input matInput [(ngModel)]="data.dataNascimento" type="date" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Cancelar</button>
      <button mat-button color="primary" [mat-dialog-close]="data">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  imports: [...materialImports, CommonModule, FormsModule],
})
export class DialogFuncionarioComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      titulo: string;
      nome: string;
      email: string;
      senha: string;
      dataNascimento: string;
    }
  ) {
    console.log("Dados do DialogFuncionarioComponent:", data);
  }
}
