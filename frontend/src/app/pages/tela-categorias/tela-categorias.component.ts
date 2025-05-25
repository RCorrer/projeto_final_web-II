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
import { catchError, Observable, of, tap } from "rxjs";

@Component({
  selector: "app-tela-categorias",
  standalone: true,
  imports: [
    ...materialImports,
    NavbarComponent,
    CardCategoriaComponent,
    CommonModule,
    DialogConfirmComponent,
  ],
  templateUrl: "./tela-categorias.component.html",
  styleUrl: "./tela-categorias.component.css",
})
export class TelaCategoriasComponent implements OnInit {
  categorias$!: Observable<Categoria[]>;
  errorOccurred: boolean = false; // Nova flag

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

  listarCategorias(): void {
    this.errorOccurred = false; // Reseta a flag antes de tentar carregar
    console.log(
      "TelaCategoriasComponent: listarCategorias - Iniciando busca de categorias."
    );
    this.categorias$ = this.categoriaService.listarCategorias().pipe(
      tap((data) => {
        console.log(
          "TelaCategoriasComponent: listarCategorias - Dados recebidos:",
          data
        );
        if (data && data.length === 0) {
          console.warn(
            "TelaCategoriasComponent: listarCategorias - Nenhuma categoria retornada."
          );
        }
      }),
      catchError((error) => {
        console.error(
          "TelaCategoriasComponent: listarCategorias - Erro ao buscar categorias:",
          error
        );
        this.errorOccurred = true; // Define a flag de erro
        return of([]);
      })
    );
    console.log(
      "TelaCategoriasComponent: listarCategorias - Observable categorias$ atribuído."
    );
  }

  abrirDialog(categoriaEditando?: Categoria): void {
    console.log(
      "TelaCategoriasComponent: abrirDialog - Chamado com:",
      categoriaEditando
    );
    // Descomente e ajuste conforme sua implementação do DialogCategoriaComponent
    /*
    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      width: '400px', // Exemplo
      data: {
        titulo: categoriaEditando ? "Editar Categoria" : "Nova Categoria",
        // Passando a categoria inteira ou apenas os dados necessários
        categoria: categoriaEditando || { descricao: "" },
      },
    });

    dialogRef.afterClosed().subscribe((dados) => {
      console.log("TelaCategoriasComponent: abrirDialog - Dialog fechado. Dados:", dados);
      if (dados) { // 'dados' deve ser o objeto da categoria ou os dados para criar/atualizar
        if (categoriaEditando && categoriaEditando.id) { // Verifica se é edição
          this.categoriaService
            .atualizarCategoria(categoriaEditando.descricao, dados.descricao) // Ajuste conforme a assinatura do seu método
            .subscribe({
              next: () => {
                console.log("TelaCategoriasComponent: Categoria atualizada com sucesso.");
                this.listarCategorias(); // Atualiza a lista
              },
              error: (err) => console.error("TelaCategoriasComponent: Erro ao atualizar categoria", err)
            });
        } else { // Nova categoria
          this.categoriaService
            .adicionarCategoria({ descricao: dados.descricao } as Categoria) // Ajuste conforme o tipo esperado
            .subscribe({
              next: () => {
                console.log("TelaCategoriasComponent: Categoria adicionada com sucesso.");
                this.listarCategorias(); // Atualiza a lista
              },
              error: (err) => console.error("TelaCategoriasComponent: Erro ao adicionar categoria", err)
            });
        }
      }
    });
    */
  }

  excluirCategoria(categoriaParaExcluir: Categoria): void {
    console.log(
      "TelaCategoriasComponent: excluirCategoria - Chamado para:",
      categoriaParaExcluir
    );
    // Descomente e ajuste conforme sua implementação do DialogConfirmComponent e serviço
    /*
    if (!categoriaParaExcluir || !categoriaParaExcluir.id) {
      console.error("TelaCategoriasComponent: excluirCategoria - Categoria ou ID da categoria inválido.");
      return;
    }
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        titulo: "Confirmação de Exclusão",
        mensagem: `Deseja realmente excluir a categoria "${categoriaParaExcluir.descricao}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      console.log("TelaCategoriasComponent: excluirCategoria - Confirmação recebida:", confirmado);
      if (confirmado) {
        // Assumindo que você terá um método removerCategoria no seu serviço que aceita o ID
        // this.categoriaService.removerCategoria(categoriaParaExcluir.id).subscribe({
        //   next: () => {
        //     console.log(`TelaCategoriasComponent: Categoria ID: ${categoriaParaExcluir.id} excluída com sucesso.`);
        //     this.listarCategorias(); // Atualiza a lista de categorias
        //   },
        //   error: (err) => console.error(`TelaCategoriasComponent: Erro ao excluir categoria ID: ${categoriaParaExcluir.id}`, err),
        // });
        console.warn("Lógica de exclusão da categoria não implementada no serviço.");
      } else {
        console.log("TelaCategoriasComponent: Exclusão da categoria cancelada.");
      }
    });
    */
    // Remova ou implemente a linha abaixo
    // throw new Error("TelaCategoriasComponent: excluirCategoria - Método não completamente implementado.");
  }
}
