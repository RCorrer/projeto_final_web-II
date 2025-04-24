import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../../components/dialog/dialog.component";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";
import { materialImports } from "../../material-imports";
import { Equipamento } from "../../models/equipamento.model";
import { EquipamentoService } from "../../services/equipamento.service";

@Component({
  selector: "app-tela-equipamentos",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardEquipamentoComponent,
    CommonModule,
    DialogConfirmComponent
  ],
  templateUrl: "./tela-equipamentos.component.html",
  styleUrl: "./tela-equipamentos.component.css",
})
export class TelaEquipamentosComponent implements OnInit {
  equipamentos: Equipamento[] = [];

  private dialog = inject(MatDialog);
  private equipamentoService = inject(EquipamentoService);

  ngOnInit(): void {
    this.equipamentoService.equipamentos$.subscribe((equipamentos) => {
      this.equipamentos = equipamentos;
    });
  }

  abrirDialog(equipamentoExistente?: Equipamento) {
    const novaDescricao = prompt('Descrição do equipamento:', equipamentoExistente?.descricao || '');
  
    if (novaDescricao) {
      if (equipamentoExistente) {
        this.equipamentoService.atualizarEquipamento(equipamentoExistente.id, novaDescricao).subscribe();
      } else {
        this.equipamentoService.adicionarEquipamento({ descricao: novaDescricao });
      }
    }
  }
  
  excluirEquipamento(equipamento: Equipamento): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente excluir o equipamento?',
      },
    });
  
    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.equipamentoService.removerEquipamento(equipamento.id);
      }
    });
  }
  
}  