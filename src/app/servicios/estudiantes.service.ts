import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

export interface Estudiante {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  estadoAdmision: string | null;
  numDoc: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  // CAMBIO 1: Solo la URL base sin /alumno
  private urlBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // CAMBIO 2: Construir la URL correctamente con el número como parámetro de ruta
  public getEstudiantePorNumDoc(numDoc: string): Observable<Estudiante> {
    const url = `${this.urlBase}/alumno/${numDoc}`;
    console.log('URL que se está llamando:', url);
    return this.http.get<Estudiante>(url);
  }

  public getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.urlBase}/alumno`);
  }
}