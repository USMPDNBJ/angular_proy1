import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstudiantesService, Estudiante } from '../servicios/estudiantes.service';

@Component({
  selector: 'app-consulta-postulacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consulta-postulacion.component.html',
  styleUrls: ['./consulta-postulacion.component.css']
})
export class ConsultaPostulacionComponent {
  estudiante: Estudiante | null = null;
  numDocBuscar = '';
  cargando = false;
  error = '';

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
      },
      error: () => {
        this.error = 'No existe información asociada al documento de identidad proporcionado.';
        this.cargando = false;
      }
    });
  }

  limpiarBusqueda() {
    this.estudiante = null;
    this.numDocBuscar = '';
    this.error = '';
  }
}
