import { Component } from "@angular/core";
import { materialImports } from "../../material-imports";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { CommonModule, CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-orcamento-funcionario",
  imports: [
    ...materialImports,
    MatInputModule,
    FormsModule,
    CommonModule,
    NavbarComponent,
  ],
  providers: [CurrencyPipe],
  templateUrl: "./orcamento-funcionario.component.html",
  styleUrl: "./orcamento-funcionario.component.css",
})
export class OrcamentoFuncionarioComponent {
  valorOrcamento: string = "";
  constructor(public currencyPipe: CurrencyPipe) {}
  formatarMoeda() {
    let valor = this.valorOrcamento.replace(/\D/g, "");
    let valorFormatado = (Number(valor) / 100).toFixed(2);
    this.valorOrcamento =
      this.currencyPipe.transform(valorFormatado, "BRL", "symbol", "1.2-2") ||
      "";
  }

  enviarOrcamento() {
    console.log("BUM! ENVIADO (mentira, só depois de criar um serviço aqui)");
  }
}
