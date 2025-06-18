import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

interface dadosCEP {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Component({
  selector: "app-cadastro",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.css",
})
export class CadastroComponent implements AfterViewInit {
  private audio = new Audio("bipbip-sound.mp3");
  cadastroForm: FormGroup;
  cepNaoEncontrado: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ["", Validators.required],
      cpf: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
          this.validarCPFValidator.bind(this),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      telefone: [
        "",
        [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)],
      ],
      cep: ["", [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      estado: [{ value: "", disabled: true }],
      cidade: [{ value: "", disabled: true }],
      bairro: [{ value: "", disabled: true }],
      rua: [{ value: "", disabled: true }],
      numero: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      complemento: [""],
    });
  }

  ngAfterViewInit() {
    const interBubble = document.querySelector(".interactive") as HTMLElement;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(() => {
        move();
      });
    }

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    this.cadastroForm.get("cep")?.valueChanges.subscribe((cep: string) => {
      const cleanedCEP = cep.replace(/\D/g, "");
      if (cleanedCEP.length === 8) {
        this.buscarCEP(cep);
      }
    });

    this.cadastroForm.get("cpf")?.valueChanges.subscribe((cpf: string) => {
      const cleanedCPF = cpf.replace(/\D/g, "");
      if (cleanedCPF.length === 11) {
        this.cadastroForm.get("cpf")?.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch((e) => console.error("Audio playback failed:", e));
  }

  onSubmit() {
    if (this.cadastroForm.invalid) return;
    console.log("Formulário enviado:", this.cadastroForm.value);
    // Aqui você pode redirecionar, chamar API, etc.
  }

  formatarCPF() {
    const control = this.cadastroForm.get("cpf");
    if (!control) return;

    let value = control.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length >= 10) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (value.length >= 7) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length >= 4) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    control.setValue(value, { emitEvent: false });
  }

  validarCPFValidator(control: any) {
    const value = control.value || "";
    if (value.length !== 14) return null;
    return this.validarCPF(value) ? null : { cpfInvalido: true };
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    const calc = (base: number) =>
      cpf
        .substring(0, base)
        .split("")
        .reduce(
          (sum, digit, idx) => sum + parseInt(digit) * (base + 1 - idx),
          0
        );

    const dig1 = (11 - (calc(9) % 11)) % 10;
    const dig2 = (11 - ((calc(10) + dig1 * 2) % 11)) % 10;

    return parseInt(cpf[9]) === dig1 && parseInt(cpf[10]) === dig2;
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) {
      value = value.replace(/^(\d{0,2})/, "($1");
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
    } else if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    this.cadastroForm.get("telefone")?.setValue(value, { emitEvent: false });
  }

  formatarCEP(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    if (value.length > 5) {
      value = value.substring(0, 5) + "-" + value.substring(5, 8);
    }

    this.cadastroForm.get("cep")?.setValue(value, { emitEvent: false });
    input.value = value;
  }

  async buscarCEP(cep: string) {
    const cleanedCEP = cep.replace(/\D/g, "");
    this.cepNaoEncontrado = false;

    if (cleanedCEP.length !== 8) return;

    try {
      const response = await this.http
        .get<dadosCEP>(`https://viacep.com.br/ws/${cleanedCEP}/json/`)
        .toPromise();

      if (!response || "erro" in response) {
        this.cepNaoEncontrado = true;
        this.limparEndereco();
        return;
      }

      this.cepNaoEncontrado = false;

      this.cadastroForm.patchValue({
        estado: response.uf || "",
        cidade: response.localidade || "",
        bairro: response.bairro || "",
        rua: response.logradouro || "",
      });

      this.toggleEndereco(response);
    } catch (error) {
      this.cepNaoEncontrado = true;
      this.limparEndereco();
    }
  }

  toggleEndereco(response: dadosCEP) {
    this.setFieldState("estado", !!response.uf);
    this.setFieldState("cidade", !!response.localidade);
    this.setFieldState("bairro", !!response.bairro);
    this.setFieldState("rua", !!response.logradouro);
  }

  setFieldState(field: string, hasValue: boolean) {
    const control = this.cadastroForm.get(field);
    if (hasValue) {
      control?.disable();
    } else {
      control?.enable();
    }
  }

  limparEndereco() {
    ["estado", "cidade", "bairro", "rua"].forEach((campo) => {
      const control = this.cadastroForm.get(campo);
      control?.reset();
      control?.enable();
    });
  }

  habilitarCamposEndereco() {
    this.cadastroForm.get("estado")?.enable();
    this.cadastroForm.get("cidade")?.enable();
    this.cadastroForm.get("bairro")?.enable();
    this.cadastroForm.get("rua")?.enable();
  }

  limparCEP() {
    this.cadastroForm.patchValue({
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
    });
    this.habilitarCamposEndereco();
  }
}
