import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginRequest = {
    usuario: '',
    contrasena: ''
  };

  cargando = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.loginData.usuario.trim()) {
      this.error = 'Por favor ingrese su usuario';
      return;
    }

    if (!this.loginData.contrasena.trim()) {
      this.error = 'Por favor ingrese su contraseña';
      return;
    }

    this.cargando = true;
    this.error = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.cargando = false;
        if (response.mensaje === 'Credenciales validadas') {
          console.log('Login exitoso:', response);
          this.router.navigate(['/consulta']);
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error en login:', err);

        if (err.status === 401 || err.status === 400) {
          this.error = 'Usuario o contraseña incorrectos';
        } else if (err.status === 0) {
          this.error = 'No se pudo conectar con el servidor';
        } else {
          this.error = 'Error al iniciar sesión. Intente nuevamente';
        }
      }
    });
  }
}
