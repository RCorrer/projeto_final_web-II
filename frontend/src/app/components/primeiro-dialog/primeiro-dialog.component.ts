import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SegundoDialogComponent } from '../segundo-dialog/segundo-dialog.component';
import { materialImports } from '../../material-imports';

@Component({
  selector: 'app-primeiro-dialog',
  standalone: true,
  imports: [...materialImports],
  template: `
    <h1 mat-dialog-title>Primeiro Dialog</h1>
    <div mat-dialog-content>Você quer abrir outro dialog?</div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Fechar</button>
      <button mat-raised-button color="primary" (click)="abrirSegundoDialog()">Abrir outro</button>
    </div>
  `
})
export class PrimeiroDialogComponent {
  private dialog = inject(MatDialog);

  abrirSegundoDialog(): void {
    this.dialog.open(SegundoDialogComponent);
  }
}
