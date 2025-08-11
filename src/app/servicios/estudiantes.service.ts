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
  especialidad: string;
  sede:string;
  modalidad: string;
  codEspecialidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  
  private urlBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  
  public getEstudiantePorNumDoc(numDoc: string): Observable<Estudiante> {
    const url = `${this.urlBase}/alumno/${numDoc}`;
    console.log('URL que se está llamando:', url);
    return this.http.get<Estudiante>(url);
  }

  public getEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.urlBase}/alumno`);
  }
}