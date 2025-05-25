import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardSolicitacaoClienteComponent } from "../../components/card-solicitacao-cliente/card-solicitacao-cliente.component";
import { Solicitacao } from "../../models/Solicitacao.model";

@Component({
  selector: "app-tela-inicial-cliente",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    NavbarComponent,
    RouterLink,
    // CardSolicitacaoClienteComponent,
  ],
  templateUrl: "./tela-inicial-cliente.component.html",
  styleUrl: "./tela-inicial-cliente.component.css",
})
export class TelaInicialClienteComponent {
  solicitacoes: Solicitacao[] = [];

  constructor(private solicitacaoService: SolicitacaoService) {}

  ngOnInit() {
    this.solicitacaoService.solicitacoes$.subscribe((solicitacoes) => {
      this.solicitacoes = solicitacoes
        .filter((s) => s.cliente === "Maria Joaquina")
        .sort(
          (a, b) =>
            new Date(`${a.data}T${a.hora}`).getTime() -
            new Date(`${b.data}T${b.hora}`).getTime()
        );
    });
  }

  visualizarSolicitacao(id: number) {
    console.log(`Visualizando solicitação ID: ${id}`);
  }

  mostrarOrcamento(id: number) {
    console.log(`Mostrando orçamento para solicitação ID: ${id}`);
  }

  resgatarServico(id: number) {
    console.log(`Resgatando serviço para solicitação ID: ${id}`);
  }

  pagarServico(id: number) {
    console.log(`Pagando serviço para solicitação ID: ${id}`);
  }

  alterarEstadoSolicitacao(evento: { id: number; novoEstado: string }) {
    const solicitacao = this.solicitacoes.find((s) => s.id === evento.id);
    if (solicitacao) {
      solicitacao.estado = evento.novoEstado;
    }
  }
}
