import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private userRole: string | null = null;
  private token: string | null = null;
  private userId: string | null = null;
  private userName: string | null = null;

  constructor(private router: Router) {
    this.loadUserData();
  }

  private loadUserData() {
    this.userRole = localStorage.getItem('userRole');
    this.token = localStorage.getItem('token');
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
  }

  login(response: { token: string; nome: string; id: string; role: 'FUNCIONARIO' | 'CLIENTE' }) {
    this.userRole = response.role;
    this.token = response.token;
    this.userId = response.id;
    this.userName = response.nome;

    localStorage.setItem('userRole', this.userRole);
    localStorage.setItem('token', this.token);
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('userName', this.userName);
  }

  isCliente(): boolean {
    return this.userRole === 'CLIENTE';
  }

  isFuncionario(): boolean {
    return this.userRole === 'FUNCIONARIO';
  }

  getToken():string | null {
    return this.token;
  }

  getUserId(): string | null {
    return this.userId;
  }

  getUserName(): string | null {
    return this.userName;
  }

  logout() {
    this.userRole = null;
    this.token = null;
    this.userId = null;
    this.userName = null;

    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    this.router.navigate(['/']);
  }
}
