import { Routes } from '@angular/router';
import { OrcamentoFuncionarioComponent } from './components/orcamento-funcionario/orcamento-funcionario.component';
import { TelaInicialFuncionarioComponent } from './components/tela-inicial-funcionario/tela-inicial-funcionario.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'cadastro',
    component: CadastroComponent
  },

  {
    path: 'efetuar-orcamento',
    component: OrcamentoFuncionarioComponent
  },
    
  {
    path: 'home',
    component: TelaInicialFuncionarioComponent  
  }
];
