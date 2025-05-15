import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../../components/dialog/dialog.component";

import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardCategoriaComponent } from "../../components/cards/card-categoria/card-categoria.component";
import { materialImports } from "../../material-imports";
import { Categoria } from "../../models/categoria.model";
import { CategoriaService } from "../../services/categoria.service";
import { DialogCategoriaComponent } from "../../components/dialog-equipamento/dialog-categoria.component";

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
  categorias: Categoria[] = [];
  private dialog = inject(MatDialog);
  private categoriaService = inject(CategoriaService);

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this.categoriaService.listarCategorias().subscribe((dados) => {
      this.categorias = dados;
    });
  }

  abrirDialog(categoriaEditando?: Categoria) {
    const dialogRef = this.dialog.open(DialogCategoriaComponent, {
      data: {
        titulo: categoriaEditando ? "Editar Categoria" : "Nova Categoria",
        descricao: categoriaEditando?.descricao || "",
      },
    });

    dialogRef.afterClosed().subscribe((dados) => {
      if (dados) {
        if (categoriaEditando) {
          this.categoriaService
            .atualizarCategoria(categoriaEditando.descricao, dados.descricao)
            .subscribe(() => this.listarCategorias());
        } else {
          this.categoriaService
            .adicionarCategoria({ descricao: dados.descricao })
            .subscribe(() => this.listarCategorias());
        }
      }
    });
  }

  // excluirCategoria(equipamento: Categoria): void {
  //   const dialogRef = this.dialog.open(DialogConfirmComponent, {
  //     data: {
  //       titulo: "Confirmação",
  //       mensagem: "Deseja realmente excluir o equipamento?",
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((confirmado) => {
  //     if (confirmado) {
  //       this.equipamentoService.removerCategoria(equipamento.id);
  //     }
  //   });
  // }
}
