import { Routes } from "@angular/router";
import { OrcamentoFuncionarioComponent } from "./components/orcamento-funcionario/orcamento-funcionario.component";
import { TelaInicialFuncionarioComponent } from "./components/tela-inicial-funcionario/tela-inicial-funcionario.component";
import { LoginComponent } from "./components/login/login.component";
import { CrudFuncionariosComponent } from "./components/crud-funcionarios/crud-funcionarios.component";
import { CrudEquipamentosComponent } from "./components/crud-equipamentos/crud-equipamentos.component";

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
    path: "funcionarios",
    component: CrudFuncionariosComponent,
  },

  {
    path: "equipamentos",
    component: CrudEquipamentosComponent,
  },
];
