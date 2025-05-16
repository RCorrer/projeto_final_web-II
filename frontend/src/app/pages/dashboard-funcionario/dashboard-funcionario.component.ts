import { Component, OnInit } from "@angular/core";
import { materialImports } from "../../material-imports";
import { CardSolicitacaoComponent } from "../../components/cards/card-solicitacao/card-solicitacao.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Solicitacao } from "../../models/Solicitacao.model";
import { CommonModule } from "@angular/common";
import { MatFormField } from "@angular/material/form-field";
import { MatSelect } from "@angular/material/select";
import { SolicitacaoService } from "../../services/solicitacao.service";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@Component({
  selector: "app-dashboard-funcionario",
  imports: [
    CommonModule,
    ...materialImports,
    CardSolicitacaoComponent,
    NavbarComponent,
    MatFormField,
    MatSelect,
    MatNativeDateModule,
  ],
  providers: [
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
],
  templateUrl: "./dashboard-funcionario.component.html",
  styleUrl: "./dashboard-funcionario.component.css"
})
export class DashboardFuncionarioComponent implements OnInit{
  solicitacoes: Solicitacao[] = [];
  filtroStatus: string = 'ABERTA';
  filtroForm!: FormGroup;

    constructor(private solicitacaoService: SolicitacaoService, private fb: FormBuilder) {}

get solicitacoesFiltradas(): Solicitacao[] {
    const { start, end } = this.filtroForm?.value || {};

    return this.solicitacoes.filter(s => {
      const statusOk = !this.filtroStatus || s.estado === this.filtroStatus;

      let dataOk = true;
      if (start && end) {
        const dataSolicitacao = new Date(s.data);
        dataOk = dataSolicitacao >= start && dataSolicitacao <= end;
      }

      return statusOk && dataOk;
    });
  }

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      start: [null],
      end: [null],
    });

      this.solicitacoes = [
        { id: 101, data: '2025-04-05', hora: '14:30', cliente: 'Maria Joaquina', equipamento: 'Notebook Dell', categoria: '', defeito: '', estado: 'ABERTA' },
        { id: 102, data: '2025-04-02', hora: '15:15', cliente: 'Maria Joaquina', equipamento: 'Impressora Xerox', categoria: '', defeito: '', estado: 'ORÇADA' },
        { id: 103, data: '2025-03-17', hora: '16:45', cliente: 'Maria Joaquina', equipamento: 'Mouse de bolinha', categoria: '', defeito: '', estado: 'REJEITADA' },
        { id: 104, data: '2025-04-04', hora: '17:20', cliente: 'Maria Joaquina', equipamento: 'Teclado com farelo de pão', categoria: '', defeito: '', estado: 'APROVADA' },
        { id: 105, data: '2025-02-10', hora: '08:40', cliente: 'Maria Joaquina', equipamento: 'Notebook Positivo feito pra defeito', categoria: '', defeito: '', estado: 'REDIRECIONADA' },
        { id: 106, data: '2025-04-06', hora: '09:15', cliente: 'Maria Joaquina', equipamento: 'Impressora HP (HarryPotter)', categoria: '', defeito: '', estado: 'ARRUMADA' },
        { id: 107, data: '2025-02-10', hora: '08:45', cliente: 'Maria Joaquina', equipamento: 'Monitor Tubo', categoria: '', defeito: '', estado: 'PAGA' },
        { id: 108, data: '2025-04-08', hora: '11:20', cliente: 'Maria Joaquina', equipamento: 'Monitor LG 24"', categoria: '', defeito: '', estado: 'FINALIZADA' }
      ];
      
//pega os dados do service
    this.solicitacaoService.solicitacoes$.subscribe(solicitacoes => {
// atualizar com dados do service sem perder os mockados
      this.solicitacoes = [
        ...this.solicitacoes, //mock
        ...solicitacoes //service
      ];
// ordenacao por data/hora
      this.solicitacoes = this.solicitacoes.sort((a, b) => {
        const dataHoraA = new Date(`${a.data}T${a.hora}`);
        const dataHoraB = new Date(`${b.data}T${b.hora}`);
        return dataHoraA.getTime() - dataHoraB.getTime();
      });
  });
}}
