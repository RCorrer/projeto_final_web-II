import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-modal-orientacoes",
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: "./modal-orientacoes.component.html",
  styleUrls: ["./modal-orientacoes.component.css"],
})
export class ModalOrientacoesComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { descricaoManutencao: string; orientacoesCliente: string }
  ) {}
}
