import { Component, Inject, ViewEncapsulation, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../material-imports";
import { FuncionarioService } from "../../services/funcionario/funcionario.service";

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
      id?: string;
      nome: string;
      email: string;
      nascimento: string;
      senha?: string;
    },
    private funcionarioService: FuncionarioService
  ) {}

  salvar() {
    const funcionario = {
      nome: this.data.nome,
      email: this.data.email,
      senha: this.data.senha ?? "",
      dataNascimento: this.data.nascimento,
    };

    if (this.data.id) {
      this.funcionarioService
        .atualizarFuncionario(this.data.id, {
          nome: funcionario.nome,
          email: funcionario.email,
          senha: funcionario.senha,
          nascimento: funcionario.dataNascimento,
        })
        .subscribe({
          next: () => this.dialogRef.close(true),
        });
    } else {
      this.funcionarioService.adicionarFuncionario(funcionario).subscribe({
        next: () => this.dialogRef.close(true)
      });
    }
  }
}
