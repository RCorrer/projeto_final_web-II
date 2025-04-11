import { Component, inject } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { materialImports } from "../../material-imports";
import { CardFuncionarioComponent } from "../../components/cards/card-funcionario/card-funcionario.component";
import { MatDialog } from "@angular/material/dialog";
import { DadosFuncionarioComponent } from "../../components/dados-funcionario/dados-funcionario.component";
import { Funcionario } from "../../models/funcionario.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-tela-funcionarios",
  standalone: true,
  imports: [...materialImports, NavbarComponent, CardFuncionarioComponent, CommonModule],
  templateUrl: "./tela-funcionarios.component.html",
  styleUrl: "./tela-funcionarios.component.css",
})
export class TelaFuncionariosComponent {
  funcionarios: Funcionario[] = [
    // Lista de funcionários fictícios para testes
    // {
    //   id: "1",
    //   dataNascimento: "1990-05-15",
    //   senha: "123456",
    //   usuario: {
    //     id: "u1",
    //     nome: "Maria Souza",
    //     email: "maria@example.com",
    //   },
    // },
    // {
    //   id: "2",
    //   dataNascimento: "1985-12-22",
    //   senha: "123456",
    //   usuario: {
    //     id: "u2",
    //     nome: "João Silva",
    //     email: "joao@example.com",
    //   },
    // },
  ];

  private dialog = inject(MatDialog);
  abrirDialog() {
    this.dialog.open(DadosFuncionarioComponent, {
      width: "600px",
    });
  }
}
