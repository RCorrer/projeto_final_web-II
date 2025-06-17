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
  private categoriasSubject = new BehaviorSubject<string[]>([]);

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {
    console.log("TelaCategoriasComponent: Construtor chamado.");
  }

  ngOnInit(): void {
    console.log("TelaCategoriasComponent: ngOnInit chamado.");
    this.listarCategorias();
  }

  // --------------------------------------------------------------------------------------------------
  listarCategorias(): void {
    this.errorOccurred = false;
    this.categorias$ = this.categoriaService.listarCategorias().pipe(
      tap((data) => console.log("Dados recebidos:", data)),
      catchError((error) => {
        console.error("Erro ao buscar categorias:", error);
        this.errorOccurred = true;
        return of([]);
      })
    );
  }

  // --------------------------------------------------------------------------------------------------
  abrirDialog(descricaoAtual?: string): void {
    const isEditing = !!descricaoAtual;
    console.log(
      isEditing
        ? `Editando categoria: ${descricaoAtual}`
        : "Adicionando nova categoria"
    );

    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      width: "450px",
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
            console.log(
              `Atualizando de '${descricaoAtual}' para '${novaDescricao}'`
            );
            this.categoriaService
              .atualizarCategoria(descricaoAtual, novaDescricao)
              .subscribe({
                next: () => this.listarCategorias(),
                error: (err) =>
                  console.error("Erro ao atualizar categoria", err),
              });
          } else {
            console.log(`Adicionando nova categoria '${novaDescricao}'`);
            this.categoriaService
              .adicionarCategoria({ descricao: novaDescricao })
              .subscribe({
                next: () => this.listarCategorias(),
                error: (err) =>
                  console.error("Erro ao adicionar categoria", err),
              });
          }
        }
      });
  }

  // --------------------------------------------------------------------------------------------------
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
            console.log("Categoria removida com sucesso.");
            this.listarCategorias();
          },
          error: (err) => console.error("Erro ao remover categoria", err),
        });
      } else {
        console.log("Exclusão cancelada pelo usuário.");
      }
    });
  }

  excluirTeste(descricao: string): void {
    console.log("Teste");
  }
}
