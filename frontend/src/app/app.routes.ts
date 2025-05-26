import { Routes } from "@angular/router";
import { OrcamentoFuncionarioComponent } from "./pages/orcamento-funcionario/orcamento-funcionario.component";
import { DashboardFuncionarioComponent } from "./pages/dashboard-funcionario/dashboard-funcionario.component";
import { LoginComponent } from "./pages/login/login.component";
import { CadastroComponent } from './pages/cadastro/cadastro.component';

import { TelaFuncionariosComponent } from "./pages/tela-funcionarios/tela-funcionarios.component";
import { TelaRelatorioComponent } from "./pages/tela-relatorio/tela-relatorio.component";
import { TelaSolicitarManutencaoComponent } from "./pages/tela-solicitar-manutencao/tela-solicitar-manutencao.component";
import { TelaVisualizarComponent } from "./pages/tela-visualizar/tela-visualizar.component";
import { TelaEfetuarManutencaoComponent } from "./pages/tela-efetuar-manutencao/tela-efetuar-manutencao.component";
import { TelaInicialClienteComponent } from "./pages/tela-inicial-cliente/tela-inicial-cliente.component";
import { TelaPagamentoComponent } from "./pages/tela-pagamento/tela-pagamento.component";
import { funcionarioGuard } from "./guard/funcionario.guard";
import { clienteGuard } from "./guard/cliente.guard";
import { TelaCategoriasComponent } from "./pages/tela-categorias/tela-categorias.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "cadastro",
    component: CadastroComponent,
  },

  {
    path: "home",
    component: DashboardFuncionarioComponent,
    canActivate: [funcionarioGuard],
  },

  {
    path: "efetuar-orcamento/:id",
    component: OrcamentoFuncionarioComponent,
    canActivate: [funcionarioGuard],
  },

  {
    path: "funcionarios",
    component: TelaFuncionariosComponent,
    canActivate: [funcionarioGuard],
  },

  {
    path: "manutencao/:id",
    component: TelaEfetuarManutencaoComponent,
    canActivate: [funcionarioGuard],
  },
  
  {
    path: "categorias",
    component: TelaCategoriasComponent,
    canActivate: [funcionarioGuard],
  },

  {
    path: "relatorios",
    component: TelaRelatorioComponent,
    canActivate: [funcionarioGuard],
  },

  {
    path: "home-cliente",
    component: TelaInicialClienteComponent,
    canActivate: [clienteGuard],
  },

  {
    path: "abrir-solicitacao",
    component: TelaSolicitarManutencaoComponent,
    canActivate: [clienteGuard],
  },

  {
    path: "visualizar/:id",
    component: TelaVisualizarComponent,
    canActivate: [clienteGuard],
  },

  {
    path: "pagamento/:id",
    component: TelaPagamentoComponent,
    canActivate: [clienteGuard],
  }
];