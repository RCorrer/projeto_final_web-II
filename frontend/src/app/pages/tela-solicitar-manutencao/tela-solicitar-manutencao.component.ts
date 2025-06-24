import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDialog } from "@angular/material/dialog";
import { Router, RouterLink } from "@angular/router";
import { SolicitacaoService } from "../../services/solicitacao/solicitacao.service";
import { AuthService } from "../../services/auth/auth.service";
import { environment } from "../../../environments/environment";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";

@Component({
  selector: "app-tela-solicitar-manutencao",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./tela-solicitar-manutencao.component.html",
  styleUrls: ["./tela-solicitar-manutencao.component.css"],
})
export class TelaSolicitarManutencaoComponent implements OnInit {
  categorias: string[] = [];
  mostrarRejeicao = false;
  solicitacaoForm: FormGroup;

  readonly apiUrl = `${environment.apiURL}/categoria`;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.solicitacaoForm = this.fb.group({
      descEquip: ["", Validators.required],
      categoria: ["", Validators.required],
      descDefeito: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.http.get<string[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.categorias = res;
        console.log("Categorias carregadas:", this.categorias);
      },
      error: (error) => {
        console.error("Erro ao carregar categorias:", error);
      },
    });
  }

  abrirSolicitacao() {
    if (this.solicitacaoForm.invalid) {
      const mensagem = "Formulário inválido. Verifique os campos.";
      this.dialog.open(ModalErroComponent, {
        data: { mensagem },
      });
      return;
    }

    const idCliente = this.authService.getIdRole() ?? "";

    if (!idCliente) {
      const mensagem =
        "ID do cliente não encontrado. Não é possível criar a solicitação.";
      this.dialog.open(ModalErroComponent, {
        data: { mensagem },
      });
      return;
    }

    const formData = this.solicitacaoForm.getRawValue();
    const solicitacao = {
      idCliente: idCliente,
      descEquip: formData.descEquip,
      categoria: formData.categoria,
      descDefeito: formData.descDefeito,
    };

    this.solicitacaoService.adicionarSolicitacao(solicitacao).subscribe({
      next: () => {
        console.log("Solicitação de manutenção criada com sucesso.");
        this.router.navigate(["/home-cliente"]);
      },
      error: (error) => {
        const mensagem =
          error?.error?.mensagem ||
          "Erro ao abrir a solicitação. Verifique os dados e tente novamente.";
        this.dialog.open(ModalErroComponent, {
          data: { mensagem },
        });
      },
    });
  }

  mostarModalRejeitar() {
    this.mostrarRejeicao = true;
  }

  cancelarRejeicao() {
    this.mostrarRejeicao = false;
  }

  confirmarRejeicao() {
    this.mostrarRejeicao = false;
  }
}
