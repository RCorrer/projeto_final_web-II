import { Component, inject } from "@angular/core";
import { materialImports } from "../../material-imports";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatDialog } from "@angular/material/dialog";

import { CardEquipamentoComponent } from "../../components/cards/card-equipamento/card-equipamento.component";
import { DadosEquipamentoComponent } from "../../components/dados-equipamento/dados-equipamento.component";
import { Equipamento } from "../../models/equipamento.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-crud-equipamentos",
  imports: [
    ...materialImports,
    NavbarComponent,
    CardEquipamentoComponent,
    CommonModule,
  ],
  templateUrl: "./tela-equipamentos.component.html",
  styleUrl: "./tela-equipamentos.component.css",
})
export class TelaEquipamentosComponent {
  equipamentos: Equipamento[] = [
    { descricao: "Computador" },
    { descricao: "Periférico" },
    { descricao: "Monitor" },
    { descricao: "Rede" },
    { descricao: "Impressora" },
  ];

  private dialog = inject(MatDialog);
  abrirDialog() {
    this.dialog.open(DadosEquipamentoComponent, {
      width: "600px",
    });
  }
}
