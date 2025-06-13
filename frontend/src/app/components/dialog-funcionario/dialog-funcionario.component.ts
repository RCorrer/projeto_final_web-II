// dialog-funcionario.component.ts
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../material-imports";
import { ViewChild } from "@angular/core";

@Component({
  selector: "app-dialog-funcionario",
  standalone: true,
  templateUrl: "./dialog-funcionario.component.html",
  styleUrl: "./dialog-funcionario.component.css",
  imports: [...materialImports, CommonModule, FormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class DialogFuncionarioComponent {
  @ViewChild("form") form!: NgForm;

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

  salvar() {
    if (this.form.valid) {
      this.dialogRef.close(this.data);
    }
  }
}
