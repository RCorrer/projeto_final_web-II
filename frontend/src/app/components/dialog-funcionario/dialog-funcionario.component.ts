// dialog-funcionario.component.ts
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, NgForm } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../material-imports";
import { ViewChild } from "@angular/core";
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
  ) {
    console.log("Dados do DialogFuncionarioComponent:", data);
  }

  salvar() {
  // Log dos dados recebidos do formulário
  console.log("📝 Dados enviados no formulário:");
  console.log("Nome:", this.data.nome);
  console.log("Email:", this.data.email);
  console.log("Senha:", this.data.senha);
  console.log("Nascimento:", this.data.nascimento);

  const funcionario = {
    nome: this.data.nome,
    email: this.data.email,
    senha: this.data.senha ?? "",
    dataNascimento: this.data.nascimento,
  };

  console.log("🔧 Objeto final enviado ao backend:", funcionario);

  this.funcionarioService.adicionarFuncionario(funcionario).subscribe({
    next: () => {
      console.log("✅ Funcionário adicionado com sucesso");
      this.dialogRef.close(true);
    },
    error: (error) => {
      console.error("❌ Erro ao adicionar funcionário:", error);
    }
  });
}

}
