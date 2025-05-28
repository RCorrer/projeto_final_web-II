// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
// import { environment } from '../../../environments/environment';
import { Router } from '@angular/router'; // Opcional, para redirecionar no 401/403
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router // Opcional
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    // Verifica se a requisição é para a sua API (para não enviar token para APIs externas)
    // Você pode tornar essa verificação mais robusta se necessário
    if (token && request.url.startsWith(environment.apiURL)) { // 'environment' precisa ser importado
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Exemplo: Deslogar e redirecionar para login em caso de 401 (Não Autorizado) ou 403 (Proibido)
          console.error('AuthInterceptor: Erro de autorização', error.status, error.message);
          this.authService.logout(); // Limpa o token
          this.router.navigate(['/login']); // Redireciona para a página de login
          // Poderia também exibir uma mensagem para o usuário
        }
        return throwError(() => error); // Propaga o erro para outros manipuladores
      })
    );
  }
}

