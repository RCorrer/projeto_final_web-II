import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog"; // ajuste o caminho conforme necessário
import { Funcionario } from "../../models/funcionario.model";
import { FuncionarioService } from "../../services/funcionario/funcionario.service";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { CardFuncionarioComponent } from "../../components/cards/card-funcionario/card-funcionario.component";
import { CommonModule } from "@angular/common";
import { DialogFuncionarioComponent } from "../../components/dialog-funcionario/dialog-funcionario.component";
import { DialogConfirmComponent } from "../../components/dialog/dialog.component";

@Component({
  selector: "app-tela-funcionarios",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardFuncionarioComponent,
    CommonModule,
  ],
  templateUrl: "./tela-funcionarios.component.html",
  styleUrl: "./tela-funcionarios.component.css",
})
export class TelaFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.funcionarioService.funcionarios$.subscribe(
      (funcionarios) => (this.funcionarios = funcionarios)
    );
  }

  abrirDialog(funcionario?: Funcionario): void {
    const dialogRef = this.dialog.open(DialogFuncionarioComponent, {
      width: "500px",
      data: funcionario
        ? {
            ...funcionario,
            titulo: "Editar Funcionário",
          }
        : {
            titulo: "Novo Funcionário",
            nome: "",
            email: "",
            dataNascimento: "",
            senha: "",
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.funcionarioService
            .atualizarFuncionario(result.id, result)
            .subscribe();
        } else {
          this.funcionarioService.adicionarFuncionario(result).subscribe({
            next: () => console.log("Funcionário adicionado com sucesso"),
            error: (err) => console.error("Erro ao adicionar:", err),
          });
        }
      }
    });
  }

  excluirFuncionario(funcionario: Funcionario): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        titulo: "Confirmar Exclusão",
        mensagem: `Tem certeza que deseja excluir ${funcionario.nome}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.funcionarioService.removerFuncionario(funcionario.id).subscribe({
          next: () => console.log("Funcionário excluído com sucesso"),
          error: (err) => console.error("Erro ao excluir:", err),
        });
      }
    });
  }
}
