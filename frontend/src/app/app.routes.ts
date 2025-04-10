
import { Routes } from "@angular/router";
import { OrcamentoFuncionarioComponent } from "./components/orcamento-funcionario/orcamento-funcionario.component";
import { TelaInicialFuncionarioComponent } from "./components/tela-inicial-funcionario/tela-inicial-funcionario.component";
import { LoginComponent } from "./components/login/login.component";
import { CrudFuncionariosComponent } from "./components/crud-funcionarios/crud-funcionarios.component";
import { CrudEquipamentosComponent } from "./components/crud-equipamentos/crud-equipamentos.component";
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { TelaInicialClienteComponent } from './components/tela-inicial-cliente/tela-inicial-cliente.component';

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
    path:"cadastro",
    component: CadastroComponent
  },

  {
    path: "funcionarios",
    component: CrudFuncionariosComponent,
  },
  {
    path: 'home-cliente',
    component: TelaInicialClienteComponent  
  },
  {
    path: "equipamentos",
    component: CrudEquipamentosComponent,
  }


];
