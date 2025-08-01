import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../../components/dialog/dialog.component";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardCategoriaComponent } from "../../components/cards/card-categoria/card-categoria.component";
import { materialImports } from "../../material-imports";
import { Categoria } from "../../models/categoria.model";
import { CategoriaService } from "../../services/categoria/categoria.service";
import { DialogCategoriaComponent } from "../../components/dialog-categoria/dialog-categoria.component";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";

@Component({
  selector: "app-tela-categorias",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardCategoriaComponent,
    CommonModule,
  ],
  templateUrl: "./tela-categorias.component.html",
  styleUrl: "./tela-categorias.component.css",
})
export class TelaCategoriasComponent implements OnInit {
  categorias$!: Observable<string[]>;
  errorOccurred: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.errorOccurred = false;
    this.categorias$ = this.categoriaService.listarCategorias().pipe(
      tap(),
      catchError((error) => {
        const mensagem = error?.mensagem || "Erro ao buscar categorias";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
        this.errorOccurred = true;
        return of([]);
      })
    );
  }

  abrirDialog(descricaoAtual?: string): void {
    const isEditing = !!descricaoAtual;

    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      width: "500px",
      data: {
        titulo: isEditing ? "Editar Categoria" : "Nova Categoria",
        categoria: { descricao: descricaoAtual || "" },
      },
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { descricao: string } | undefined) => {
        if (result && result.descricao.trim() !== "") {
          const novaDescricao = result.descricao.trim();

          if (isEditing) {
            this.categoriaService
              .atualizarCategoria(descricaoAtual, novaDescricao)
              .subscribe({
                next: () => this.listarCategorias(),
              });
          } else {
            this.categoriaService
              .adicionarCategoria({ descricao: novaDescricao })
              .subscribe({
                next: () => this.listarCategorias(),
              });
          }
        }
      });
  }

  excluirCategoria(descricao: string): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        titulo: "Confirmação de Exclusão",
        mensagem: `Deseja realmente excluir a categoria "${descricao}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.categoriaService.removerCategoria(descricao).subscribe({
          next: () => {
            this.listarCategorias();
          },
        });
      }
    });
  }
}
