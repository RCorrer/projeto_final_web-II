import { Routes } from '@angular/router';
import { OrcamentoFuncionarioComponent } from './components/orcamento-funcionario/orcamento-funcionario.component';
import { TelaInicialFuncionarioComponent } from './components/tela-inicial-funcionario/tela-inicial-funcionario.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
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
