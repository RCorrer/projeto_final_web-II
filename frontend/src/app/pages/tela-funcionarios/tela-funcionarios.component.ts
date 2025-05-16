import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog"; // ajuste o caminho conforme necessário
import { Funcionario } from "../../models/funcionario.model";
import { FuncionarioService } from "../../services/funcionario.service";
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
    CommonModule
],
  templateUrl: "./tela-funcionarios.component.html",
  styleUrl: "./tela-funcionarios.component.css",
})
export class TelaFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  private dialog = inject(MatDialog);
  private funcionarioService = inject(FuncionarioService);

  ngOnInit(): void {
    this.funcionarioService.funcionarios$.subscribe((funcionarios) => {
      this.funcionarios = funcionarios;
    });
  }

  abrirDialog(funcionarioEditando?: Funcionario) {
    const dialogRef = this.dialog.open(DialogFuncionarioComponent, {
      data: {
        titulo: funcionarioEditando ? "Editar Funcionário" : "Novo Funcionário",
        nome: funcionarioEditando?.usuario?.nome || "",
        email: funcionarioEditando?.usuario?.email || "",
        senha: funcionarioEditando?.senha || "",
        dataNascimento: funcionarioEditando?.dataNascimento || "2000-01-01",
      },
    });

    dialogRef.afterClosed().subscribe((dadosFuncionario) => {
      if (dadosFuncionario) {
        if (funcionarioEditando) {
          this.funcionarioService
          this.funcionarioService.atualizarFuncionario(
            funcionarioEditando.id,
            {
              nome: dadosFuncionario.nome,
              email: dadosFuncionario.email,
              senha: dadosFuncionario.senha,
              dataNascimento: dadosFuncionario.dataNascimento
            }
          ).subscribe();
          
        } else {
          this.funcionarioService.adicionarFuncionario({
            dataNascimento: dadosFuncionario.dataNascimento,
            senha: dadosFuncionario.senha,
            usuario: {
              id: Date.now().toString(),
              nome: dadosFuncionario.nome,
              email: dadosFuncionario.email,
            },
          });
        }
      }
    });
  }

  excluirFuncionario(funcionario: Funcionario) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente excluir o funcionario?',
      },
    });
  
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.funcionarioService.removerFuncionario(funcionario.id);
      }
    });
  }
}
