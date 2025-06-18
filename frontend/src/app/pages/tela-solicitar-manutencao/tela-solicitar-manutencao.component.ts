import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatOption, MatSelect } from "@angular/material/select";
import { Router, RouterLink } from "@angular/router";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: "app-tela-solicitar-manutencao",
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    MatSelect,
    MatOption,
    RouterLink,
    FormsModule,
  ],
  templateUrl: "./tela-solicitar-manutencao.component.html",
  styleUrl: "./tela-solicitar-manutencao.component.css",
})
export class TelaSolicitarManutencaoComponent {
  mostrarRejeicao = false;

  data = {
    idCliente: "",
    descEquip: "",
    categoria: "",
    descDefeito: "",
  };

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private authService: AuthService
  ) {}

  abrirSolicitacao() {
    this.data.idCliente = this.authService.getIdRole() ?? "";

    if (!this.data.idCliente) {
      console.error(
        "ID do cliente não encontrado. Não é possível criar a solicitação."
      );
      return;
    }

    const solicitacao = {
      idCliente: this.data.idCliente,
      descEquip: this.data.descEquip,
      categoria: this.data.categoria,
      descDefeito: this.data.descDefeito,
    };

    this.solicitacaoService.adicionarSolicitacao(solicitacao).subscribe({
      next: () => {
        console.log("Solicitação de manutenção criada com sucesso.");
        this.router.navigate(["/home-cliente"]);
      },
      error: (error) => {
        console.error("Erro ao criar solicitação de manutenção:", error);
      },
    });
  }

  mostarModalRejeitar() {
    this.mostrarRejeicao = true;
  }

  cancelarRejeicao() {
    this.mostrarRejeicao = false;
  }

  confirmarRejeicao() {
    this.mostrarRejeicao = false;
  }
}
