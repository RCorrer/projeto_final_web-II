import { Component } from "@angular/core";
import { Inject } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogActions,
  MatDialogContent,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-modal-erro",
  standalone: true,
  imports: [MatDialogModule, MatDialogActions, MatDialogContent, MatIconModule],
  templateUrl: "./modal-erro.component.html",
  styleUrl: "./modal-erro.component.css",
})
export class ModalErroComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalErroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string; mensagem: string }
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
