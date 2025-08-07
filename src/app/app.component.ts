import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudiantesService, Estudiante } from './servicios/estudiantes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  estudiante: Estudiante | null = null;
  numDocBuscar: string = '';
  cargando: boolean = false;
  error: string = '';

  constructor(private estudiantesService: EstudiantesService) {}

  buscarEstudiante() {
    if (!this.numDocBuscar.trim()) {
      this.error = 'Por favor ingrese un número de documento';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.estudiante = null;

    this.estudiantesService.getEstudiantePorNumDoc(this.numDocBuscar).subscribe({
      next: (datos) => {
        this.estudiante = datos;
        this.cargando = false;
        console.log('Estudiante encontrado:', this.estudiante);
      },
      error: (err) => {
        this.error = 'No se encontró el estudiante o hubo un error en la consulta';
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  limpiarBusqueda() {
    this.estudiante = null;
    this.numDocBuscar = '';
    this.error = '';
  }
}