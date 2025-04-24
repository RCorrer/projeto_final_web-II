import { Component, inject, OnInit } from "@angular/core";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { CardFuncionarioComponent } from "../../components/cards/card-funcionario/card-funcionario.component";
import { MatDialog } from "@angular/material/dialog";
import { DadosFuncionarioComponent } from "../../components/dados-funcionario/dados-funcionario.component";
import { Funcionario } from "../../models/funcionario.model";
import { CommonModule } from "@angular/common";
import { FuncionarioService } from "../../services/funcionario.service";
@Component({
  selector: "app-tela-funcionarios",
  standalone: true,
  imports: [...materialImports, NavbarComponent, CardFuncionarioComponent, CommonModule],
  templateUrl: "./tela-funcionarios.component.html",
  styleUrl: "./tela-funcionarios.component.css",
})
export class TelaFuncionariosComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  private dialog = inject(MatDialog);
  private funcionarioService = inject(FuncionarioService);

  ngOnInit(): void {
    this.funcionarioService.funcionarios$.subscribe(funcionarios => {
      this.funcionarios = funcionarios;
    });
  }

  abrirDialog(funcionarioEditando?: Funcionario) {
    const nome = prompt('Nome do funcionário:', funcionarioEditando?.usuario?.nome || '');
    const email = prompt('Email do funcionário:', funcionarioEditando?.usuario?.email || '');

    if (nome && email) {
      if (funcionarioEditando) {
        this.funcionarioService
          .atualizarFuncionario(funcionarioEditando.id, nome, email)
          .subscribe(); // Aqui só atualiza o observable interno
      } else {
        this.funcionarioService.adicionarFuncionario({
          dataNascimento: '2000-01-01',
          senha: '123456',
          usuario: {
            id: 'u' + Date.now(),
            nome,
            email,
          },
        });
      }
    }
  }

  excluirFuncionario(funcionario: Funcionario) {
    const confirmacao = confirm(`Deseja realmente excluir ${funcionario.usuario.nome}?`);
    if (confirmacao) {
      this.funcionarios = this.funcionarios.filter(f => f.id !== funcionario.id);
    }
  }
  
}

