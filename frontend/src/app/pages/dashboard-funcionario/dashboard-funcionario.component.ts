import { Component, OnInit } from "@angular/core";
import { materialImports } from "../../material-imports";
import { CardSolicitacaoComponent } from "../../components/cards/card-solicitacao/card-solicitacao.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Solicitacao } from "../../models/Solicitacao.model";
import { CommonModule } from "@angular/common";


@Component({
  selector: "app-dashboard-funcionario",
  imports: [
    CommonModule,
    ...materialImports,
    CardSolicitacaoComponent,
    NavbarComponent
  ],
  templateUrl: "./dashboard-funcionario.component.html",
  styleUrl: "./dashboard-funcionario.component.css"
})
export class DashboardFuncionarioComponent implements OnInit{
  solicitacoes: Solicitacao[] = [];

  ngOnInit(): void {
      this.solicitacoes = [
        { id: 101, data: '2025-04-05', hora: '14:30', cliente: 'Maria Joaquina', equipamento: 'Notebook Dell', estado: 'ABERTA' },
        { id: 102, data: '2025-04-02', hora: '15:15', cliente: 'Maria Joaquina', equipamento: 'Impressora Xerox', estado: 'ORÇADA' },
        { id: 103, data: '2025-03-17', hora: '16:45', cliente: 'Maria Joaquina', equipamento: 'Mouse de bolinha', estado: 'REJEITADA' },
        { id: 104, data: '2025-04-04', hora: '17:20', cliente: 'Maria Joaquina', equipamento: 'Teclado com farelo de pão', estado: 'APROVADA' },
        { id: 105, data: '2025-02-10', hora: '08:40', cliente: 'Maria Joaquina', equipamento: 'Notebook Positivo feito pra defeito', estado: 'REDIRECIONADA' },
        { id: 106, data: '2025-04-06', hora: '09:15', cliente: 'Maria Joaquina', equipamento: 'Impressora HP (HarryPotter)', estado: 'ARRUMADA' },
        { id: 107, data: '2025-02-10', hora: '08:45', cliente: 'Maria Joaquina', equipamento: 'Monitor Tubo', estado: 'PAGA' },
        { id: 108, data: '2025-04-08', hora: '11:20', cliente: 'Maria Joaquina', equipamento: 'Monitor LG 24"', estado: 'FINALIZADA' }
      ];
      console.log('Solicitações carregadas:', this.solicitacoes);
  }
}
