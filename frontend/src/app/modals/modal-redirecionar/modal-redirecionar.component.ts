import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../material-imports';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario/funcionario.service';
import { Funcionario } from '../../models/funcionario.model';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-modal-redirecionar',
  standalone: true,
  imports: [CommonModule, FormsModule, ...materialImports],
  templateUrl: './modal-redirecionar.component.html',
  styleUrls: ['./modal-redirecionar.component.css']
})
export class ModalRedirecionarComponent implements OnInit {
  @Input() isOpen = false;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmado = new EventEmitter<string>();

  funcionariosDisponiveis: Funcionario[] = [];
  funcionarioDestinoId: string | null = null;

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

carregarFuncionarios(): void {
  const idUsuarioLogado = this.authService.getUserId();
  this.funcionarioService.fetchAllFuncionarios().subscribe({
    next: (listaCompleta) => {
      this.funcionariosDisponiveis = listaCompleta.filter(funcionario => {
        return !idUsuarioLogado || funcionario.usuarioId !== idUsuarioLogado;
      });
    }
  });
}

  confirmar(): void {
    if (this.funcionarioDestinoId) {
      this.confirmado.emit(this.funcionarioDestinoId);
    }
  }

  fechar(): void {
    this.closed.emit();
  }
}