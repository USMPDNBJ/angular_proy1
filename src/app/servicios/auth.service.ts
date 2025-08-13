import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment.development';

export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

export interface LoginResponse {
  mensaje: string;
  codigo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private urlBase = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.urlBase}/alumno/login`;

    return this.http.post<LoginResponse>(url, credentials).pipe(
      tap((response) => {
        if (response.codigo && this.isBrowser()) {
          sessionStorage.setItem('authToken', response.codigo);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem('authToken');
    }
    this.isLoggedInSubject.next(false);
  }

  hasValidToken(): boolean {
    if (!this.isBrowser()) return false;
    const token = sessionStorage.getItem('authToken');
    return !!token;
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return sessionStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.hasValidToken();
  }
}
