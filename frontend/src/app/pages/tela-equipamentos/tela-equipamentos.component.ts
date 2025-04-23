import { Component, OnInit, inject } from "@angular/core";
import { materialImports } from "../../material-imports";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatDialog } from "@angular/material/dialog";

import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";
import { DadosEquipamentoComponent } from "../../components/dados-equipamento/dados-equipamento.component";
import { CommonModule } from "@angular/common";
import { EquipamentoService } from "../../services/equipamento.service";
import { Equipamento } from "../../models/equipamento.model";

@Component({
  selector: "app-crud-equipamentos",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardEquipamentoComponent,
    CommonModule,
  ],
  templateUrl: "./tela-equipamentos.component.html",
  styleUrls: ["./tela-equipamentos.component.css"],
})
export class TelaEquipamentosComponent implements OnInit {
  equipamentos: Equipamento[] = [];
  private dialog = inject(MatDialog);
  private equipamentoService = inject(EquipamentoService);

  ngOnInit(): void {
    this.carregarEquipamentos();
  }

  carregarEquipamentos() {
    this.equipamentoService.listarEquipamentos().subscribe((equipamentos) => {
      this.equipamentos = equipamentos;
    });
  }

  abrirDialog(equipamento?: string) {
    const dialogRef = this.dialog.open(DadosEquipamentoComponent, {
      width: "500px",
      data: { equipamento },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.equipamentoService.adicionarEquipamento(result).subscribe(() => {
          this.carregarEquipamentos();
        });
      }
    });
  }

  excluirEquipamento(descricao: string) {
    this.equipamentoService.excluirEquipamento(descricao).subscribe(() => {
      this.carregarEquipamentos();
    });
  }
}
