import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface LoginResponse { // Deve bater com o LoginResponseDTO do backend
  token: string;
  nome: string;
  idRole: string | null; // Espera-se que seja Clientes.id para um cliente
  id: string;           // Usuarios.id
  role: 'FUNCIONARIO' | 'CLIENTE';
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userRole: string | null = null;
  private token: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null;
  private idRole: string | null = null;

  constructor(private router: Router) {
    this.loadUserData();
  }

  private loadUserData() {
    this.userRole = localStorage.getItem('userRole');
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
    this.idRole = localStorage.getItem('idRole');
  }

  login(response: LoginResponse) {
    this.userRole = response.role;
    this.token = response.token;
    this.userId = response.id;
    this.userName = response.nome;
    this.idRole = response.idRole;

    localStorage.setItem('userRole', this.userRole);
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('userName', this.userName);
    if (this.idRole) {
      localStorage.setItem('idRole', this.idRole);
    } else {
      localStorage.removeItem('idRole');
    }
  }

  // isCliente(): boolean {
  //   return this.userRole === 'CLIENTE';
  // }

  // isFuncionario(): boolean {
  //   return this.userRole === 'FUNCIONARIO';
  // }

  // O codigo acima nao funcionou com o navbar com roles.
  // O codigo abaixo verifica as roles direto no localStorage, garante persistencia quando recarrega a pagina.
  isCliente(): boolean {
  return localStorage.getItem('userRole') === 'CLIENTE';
  }

  isFuncionario(): boolean {
    return localStorage.getItem('userRole') === 'FUNCIONARIO';
  }

  getToken():string | null {
    return this.token;
  }

  getUserId(): string | null {
    this.userId = localStorage.getItem('userId');
    return this.userId;
  }

  getUserName(): string | null {
    return this.userName;
  }

  getIdRole(): string | null {
    this.idRole = localStorage.getItem('idRole');
    return this.idRole;
  }

  logout() {
    this.userRole = null;
    this.token = null;
    this.userId = null;
    this.userName = null;
    this.idRole = null;

    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('idRole');

    this.router.navigate(['/']);
  }
}
