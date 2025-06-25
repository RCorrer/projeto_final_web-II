import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { materialImports } from "../../material-imports";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-dialog-categoria",
  imports: [...materialImports, CommonModule, FormsModule],
  templateUrl: "./dialog-categoria.component.html",
  styleUrl: "./dialog-categoria.component.css",
})
export class DialogCategoriaComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      titulo: string;
      descricao: string;
    }
  ) {}
}
