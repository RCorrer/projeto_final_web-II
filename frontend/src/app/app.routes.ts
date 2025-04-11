import { Routes } from "@angular/router";
import { OrcamentoFuncionarioComponent } from "./pages/orcamento-funcionario/orcamento-funcionario.component";
import { TelaInicialFuncionarioComponent } from "./pages/tela-inicial-funcionario/tela-inicial-funcionario.component";
import { LoginComponent } from "./components/login/login.component";
import { TelaFuncionariosComponent } from "./pages/tela-funcionarios/tela-funcionarios.component";
import { CrudEquipamentosComponent } from "./pages/crud-equipamentos/crud-equipamentos.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";
import { TelaInicialClienteComponent } from "./pages/tela-inicial-cliente/tela-inicial-cliente.component";
import { RelatoriosComponent } from "./components/relatorios/relatorios.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "efetuar-orcamento",
    component: OrcamentoFuncionarioComponent,
  },

  {
    path: "home",
    component: TelaInicialFuncionarioComponent,
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
    component: CrudEquipamentosComponent,
  },
  {
    path: "relatorios",
    component: RelatoriosComponent,
  },
];
