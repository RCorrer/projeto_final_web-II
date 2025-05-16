import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../../components/dialog/dialog.component";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";
import { materialImports } from "../../material-imports";
import { Equipamento } from "../../models/equipamento.model";
import { EquipamentoService } from "../../services/equipamento.service";
import { DialogEquipamentoComponent } from "../../components/dialog-equipamento/dialog-equipamento.component";

@Component({
  selector: "app-tela-equipamentos",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardEquipamentoComponent,
    CommonModule
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

  abrirDialog(equipamentoEditando?: Equipamento) {
    const dialogRef = this.dialog.open(DialogEquipamentoComponent, {
      data: {
        titulo: equipamentoEditando ? "Editar Equipamento" : "Novo Equipamento",
        descricao: equipamentoEditando?.descricao || "",
      },
    });
  
    dialogRef.afterClosed().subscribe((dados) => {
      if (dados) {
        if (equipamentoEditando) {
          this.equipamentoService
            .atualizarEquipamento(equipamentoEditando.id, dados.descricao)
            .subscribe();
        } else {
          // Não passamos o id aqui
          this.equipamentoService.adicionarEquipamento({
            descricao: dados.descricao,  // Apenas a descrição, sem o id
          });
        }
      }
    });
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