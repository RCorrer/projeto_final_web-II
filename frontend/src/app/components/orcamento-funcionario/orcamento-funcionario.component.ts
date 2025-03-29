import { Component } from '@angular/core';

@Component({
  selector: 'app-orcamento-funcionario',
  imports: [],
  templateUrl: './orcamento-funcionario.component.html',
  styleUrl: './orcamento-funcionario.component.css'
})
export class OrcamentoFuncionarioComponent {
  enviarOrcamento() {
    console.log('BUM! ENVIADO (mentira, só depois de criar um serviço aqui)');

  }
}
