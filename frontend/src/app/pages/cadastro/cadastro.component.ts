import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RespostaApi } from "../../models/respostaApi.model";

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
  cpfNaoEncontrado: boolean = false;
  private atualizandoCPF = false;
  carregando = false;

  readonly apiUrl = "http://localhost:8080";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ["", Validators.required],
      cpf: [
        "",
        [
          Validators.required,
          Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
          this.validadorCPF(),
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
        this.buscarCEP();
      }
    });

    this.cadastroForm.get("cpf")?.valueChanges.subscribe((cpf: string) => {
      if (this.atualizandoCPF) return;

      const cleanedCPF = cpf.replace(/\D/g, "");
      if (cleanedCPF.length === 11) {
        this.atualizandoCPF = true;
        this.cadastroForm
          .get("cpf")
          ?.updateValueAndValidity({ onlySelf: true });
        this.atualizandoCPF = false;
      }
    });
  }

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch((e) => console.error("Audio playback failed:", e));
  }

  onSubmit() {
    if (
      this.cadastroForm.invalid ||
      this.cepNaoEncontrado ||
      this.cadastroForm.get("cpf")?.hasError("cpfInvalido")
    ) {
      return;
    }

    this.carregando = true;

    const formData = this.cadastroForm.getRawValue();
    const payload = {
      nome: formData.nomeCompleto,
      login: formData.email,
      cpf: formData.cpf,
      telefone: formData.telefone,
      cep: formData.cep,
      logradouro: formData.rua,
      complemento: formData.complemento,
      bairro: formData.bairro,
      localidade: formData.cidade,
      uf: formData.estado,
      numero: formData.numero,
    };

    this.http
      .post<RespostaApi>(`${this.apiUrl}/cadastro/cliente`, payload)
      .subscribe({
        next: (res) => {
          console.log("✅ Cadastro realizado:", res);
          // Delay antes de redirecionar
          setTimeout(() => {
            this.carregando = false;
            this.router.navigate(["/"]);
          }, 1500); // 1,5 segundos de espera
        },
        error: (err) => {
          console.error("❌ Erro ao cadastrar:", err);
          this.carregando = false;
        },
      });
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

  async verificarExistenciaCPF(cpf: string) {
    const cleanedCPF = cpf.replace(/\D/g, "");
    this.cpfNaoEncontrado = false;

    if (cleanedCPF.length !== 11) return;

    try {
      const response = await this.http
        .get<any>(
          `https://scpa-backend.prod.saude.gov.br/public/scpa-usuario/validacao-cpf/${cleanedCPF}`
        )
        .toPromise();

      if (!response || "erro" in response) {
        this.cpfNaoEncontrado = true;
        return;
      }

      this.cpfNaoEncontrado = false;
    } catch (error) {
      this.cpfNaoEncontrado = true;
    }
  }

  validadorCPF(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cpf = (control.value || "").replace(/\D/g, "");

      if (cpf.length !== 11) return { cpfInvalido: true };
      if (/^(\d)\1{10}$/.test(cpf)) return { cpfInvalido: true };

      let soma1 = 0;
      for (let i = 0; i < 9; i++) {
        soma1 += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let resto1 = soma1 % 11;
      let d1 = resto1 < 2 ? 0 : 11 - resto1;

      let soma2 = 0;
      for (let i = 0; i < 9; i++) {
        soma2 += parseInt(cpf.charAt(i)) * (11 - i);
      }
      soma2 += d1 * 2;
      let resto2 = soma2 % 11;
      let d2 = resto2 < 2 ? 0 : 11 - resto2;

      if (parseInt(cpf.charAt(9)) !== d1 || parseInt(cpf.charAt(10)) !== d2) {
        return { cpfInvalido: true };
      }

      return null;
    };
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

  async buscarCEP() {
    const cepControl = this.cadastroForm.get("cep");
    if (!cepControl) return;

    const cep = cepControl.value.replace(/\D/g, "");
    this.cepNaoEncontrado = false;

    if (cep.length !== 8) return;

    try {
      const response = await this.http
        .get<dadosCEP>(`https://viacep.com.br/ws/${cep}/json/`)
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
