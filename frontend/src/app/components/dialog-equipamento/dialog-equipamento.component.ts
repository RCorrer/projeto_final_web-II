import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { materialImports } from '../../material-imports';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-equipamento',
  imports: [...materialImports, CommonModule, FormsModule],
  templateUrl: './dialog-equipamento.component.html',
  styleUrl: './dialog-equipamento.component.css'
})
export class DialogEquipamentoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogEquipamentoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      titulo: string;
      descricao: string;
    }
  ) {
    console.log("Dados do DialogEquipamentoComponent:", data);
  }
}
