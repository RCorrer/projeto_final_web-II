import { Routes } from '@angular/router';
import { OrcamentoFuncionarioComponent } from './components/orcamento-funcionario/orcamento-funcionario.component';

export const routes: Routes = [
    {
        path: 'efetuar-orcamento', component: OrcamentoFuncionarioComponent
    },
import { TelaInicialFuncionarioComponent } from './components/tela-inicial-funcionario/tela-inicial-funcionario.component';

export const routes: Routes = [
    { path: 'home', component: TelaInicialFuncionarioComponent },
];
