import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-modal-motivo-rejeicao",
  imports: [CommonModule, MatDialogModule],
  templateUrl: "./modal-motivo-rejeicao.component.html",
  styleUrls: ["./modal-motivo-rejeicao.component.css"],
})
export class ModalMotivoRejeicaoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { motivo: string },
    public dialogRef: MatDialogRef<ModalMotivoRejeicaoComponent>
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
