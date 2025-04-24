import { Routes } from "@angular/router";
import { OrcamentoFuncionarioComponent } from "./pages/orcamento-funcionario/orcamento-funcionario.component";
import { DashboardFuncionarioComponent } from "./pages/dashboard-funcionario/dashboard-funcionario.component";
import { LoginComponent } from "./components/login/login.component";
import { CadastroComponent } from './components/cadastro/cadastro.component';

import { TelaFuncionariosComponent } from "./pages/tela-funcionarios/tela-funcionarios.component";
import { TelaEquipamentosComponent } from "./pages/tela-equipamentos/tela-equipamentos.component";
import { TelaRelatorioComponent } from "./pages/tela-relatorio/tela-relatorio.component";
import { TelaSolicitarManutencaoComponent } from "./components/tela-solicitar-manutencao/tela-solicitar-manutencao.component";
import { TelaVisualizarComponent } from "./components/tela-visualizar/tela-visualizar.component";
import { TelaEfetuarManutencaoComponent } from "./components/tela-efetuar-manutencao/tela-efetuar-manutencao.component";
import { TelaInicialClienteComponent } from "./pages/tela-inicial-cliente/tela-inicial-cliente.component";
import { TelaPagamentoComponent } from "./components/tela-pagamento/tela-pagamento.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "efetuar-orcamento/:id",
    component: OrcamentoFuncionarioComponent,
  },

  {
    path: "home",
    component: DashboardFuncionarioComponent,
  },

  {
    path: "cadastro",
    component: CadastroComponent,
  },

  {
    path: "funcionarios",
    component: TelaFuncionariosComponent,
  },
  
  {
    path: "home-cliente",
    component: TelaInicialClienteComponent,
  },

  {
    path: "equipamentos",
    component: TelaEquipamentosComponent,
  },

  {
    path: "relatorios",
    component: TelaRelatorioComponent,
  },

  {
    path: "abrir-solicitacao",
    component: TelaSolicitarManutencaoComponent,
  },

  {
    path: "visualizar/:id",
    component: TelaVisualizarComponent,
  },

  {
    path: "manutencao/:id",
    component: TelaEfetuarManutencaoComponent
  },

  {
    path: "pagamento/:id",
    component: TelaPagamentoComponent
  }
];

