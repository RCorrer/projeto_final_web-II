import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { materialImports } from "../../material-imports";
import { MatDialog } from "@angular/material/dialog";
import { DadosEquipamentoComponent } from "../dados-equipamento/dados-equipamento.component";

@Component({
  selector: "app-card-equipamento",
  standalone: true,
  imports: [CommonModule, ...materialImports],
  templateUrl: "./card-equipamento.component.html",
  styleUrl: "./card-equipamento.component.css",
})
export class CardEquipamentoComponent {
  equipamentos = [
    { id: 1, categoria: "Computador" },
    { id: 2, categoria: "Periférico" },
    { id: 3, categoria: "Monitor" },
    { id: 4, categoria: "Rede" },
  ];

  equipamentoSelecionado: any;
  private dialog = inject(MatDialog);

  abrirDialog() {
    this.dialog.open(DadosEquipamentoComponent, {
      width: "600px",
    });
  }

  excluir(equipamento: any) {
    console.log(`Excluindo: ${equipamento.categoria}`);
  }
}
