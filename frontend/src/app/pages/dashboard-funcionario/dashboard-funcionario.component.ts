import { Component } from "@angular/core";
import { materialImports } from "../../material-imports";
import { CardSolicitacaoComponent } from "../../components/cards/card-solicitacao/card-solicitacao.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TelaFuncionariosComponent } from "../tela-funcionarios/tela-funcionarios.component";
import { CardFuncionarioComponent } from "../../components/cards/card-funcionario/card-funcionario.component";
import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";

@Component({
  selector: "app-dashboard-funcionario",
  imports: [
    ...materialImports,
    CardSolicitacaoComponent,
    NavbarComponent,
    TelaFuncionariosComponent,
    CardFuncionarioComponent,
    CardEquipamentoComponent,
  ],
  templateUrl: "./dashboard-funcionario.component.html",
  styleUrl: "./dashboard-funcionario.component.css",
})
export class DashboardFuncionarioComponent {}
