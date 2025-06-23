import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink, Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { ModalErroComponent } from "../../modals/modal-erro/modal-erro.component";
import { environment } from "../../../environments/environment";

interface LoginResponse {
  token: string;
  nome: string;
  id: string;
  role: "FUNCIONARIO" | "CLIENTE";
  mensagem: string;
  idRole: string;
}

@Component({
  selector: "app-login",
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements AfterViewInit {
  private audio = new Audio("bipbip-sound.mp3");
  loginForm: FormGroup;
  private readonly url = environment.apiURL + "/login";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      login: ["", [Validators.required]],
      password: ["", [Validators.required]],
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
  }

  playSound() {
    this.audio.currentTime = 0;
    this.audio.play().catch((e) => console.error("Audio playback failed:", e));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.post<LoginResponse>(this.url, this.loginForm.value).subscribe({
        next: (data: LoginResponse) => {
          console.log("Login successful", data);

          this.authService.login({
            token: data.token,
            nome: data.nome,
            id: data.id,
            role: data.role,
            idRole: data.idRole,
            mensagem: data.mensagem,
          });

          if (data.role === "FUNCIONARIO") {
            this.router.navigate(["/home"]);
          } else if (data.role === "CLIENTE") {
            this.router.navigate(["/home-cliente"]);
          }
        },
        error: (error) => {
          const mensagem = error?.error?.mensagem || "Erro ao fazer login. Verifique suas credenciais.";
          this.dialog.open(ModalErroComponent, {
            data: {mensagem},
          });
        },
      });
    }
  }
}
