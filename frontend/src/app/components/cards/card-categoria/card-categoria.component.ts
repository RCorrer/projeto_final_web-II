import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: "app-card-categoria",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: "./card-categoria.component.html",
  styleUrl: "./card-categoria.component.css",
})
export class CardCategoriaComponent {
  // Recebe a string da categoria do componente pai
  @Input() data!: string;

  // Emite eventos para o componente pai quando os botões são clicados
  @Output() editar = new EventEmitter<string>();
  @Output() excluir = new EventEmitter<string>();

  onEditarClick(): void {
    this.editar.emit(this.data);
  }

  onExcluirClick(): void {
    this.excluir.emit(this.data);
  }
}
