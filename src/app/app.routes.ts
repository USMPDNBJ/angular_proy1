import { Routes } from '@angular/router';
import { ConsultaPostulacionComponent } from './consulta-postulacion/consulta-postulacion.component';
import { LoginComponent } from './paginas/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'consulta', component: ConsultaPostulacionComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
];