import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.css",
})

export class CadastroComponent implements AfterViewInit {
  private audio = new Audio("bipbip-sound.mp3");
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cadastroForm = this.fb.group({
      nomeCompleto: ["", Validators.required],
      cpf: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      email: ["", [Validators.required, Validators.email]],
      cep: ["", [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      estado: [{value:'', disabled: true}],
      cidade: [{value:'', disabled: true}],
      bairro: [{value:'', disabled: true}],
      rua: [{value:'', disabled: true}],
      numero: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
      complemento: [""]
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

    this.cadastroForm.get('cep')?.valueChanges.subscribe((cep: string | String) => {
      const cleanedCEP = cep.replace(/\D/g, '');
      if (cleanedCEP.length === 8) {
        this.buscarCEP(cep);
      }
    });
  }

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch((e) => console.error("Audio playback failed:", e));
  }

  formatarCPF(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 3 && value.length <= 6) {
      value = value.substring(0, 3) + '.' + value.substring(3);
    } else if (value.length > 6) {
      value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9);
    }

    this.cadastroForm.get('cpf')?.setValue(value, { emitEvent: false });
    input.value = value;
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 2 && value.length <= 11) {
      value = '(' + value.substring(0, 1) + ')' + ' ' + value.substring(2, 6) + '-' + value.substring(6);
    } else if (value.length === 10) {
      value = '(' + value.substring(0, 2) + ')' + ' ' + value.substring(2, 6) + '-' + value.substring(6);
    }
  }

  formatarCEP(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 5) {
      value = value.substring(0, 5) + '-' + value.substring(5, 8);
    }

    this.cadastroForm.get('cep')?.setValue(value, { emitEvent: false });
    input.value = value;
  }

  async buscarCEP(cep: String) {
    const cleanedCEP = cep.replace(/\D/g, "");
    if (cleanedCEP.length !== 8) return;

    try {
      const response = await this.http.get<dadosCEP>(`https://viacep.com.br/ws/${cleanedCEP}/json/`).toPromise();

      if (response) {
        this.cadastroForm.patchValue({
          estado: response.uf,
          cidade: response.localidade,
          bairro: response.bairro,
          rua: response.logradouro
        });
      } else {
        this.limparCEP();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      this.limparCEP();
    }
  }

  limparCEP() {
    this.cadastroForm.patchValue({
      estado: "",
      cidade: "",
      bairro: "",
      rua: ""
    });
  }
}
