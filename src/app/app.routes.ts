import { Routes } from '@angular/router';
import { InicioDeSesionAlumnoComponent } from './frontend/inicio-de-sesion-alumno/inicio-de-sesion-alumno';
import { CambioDePasswordAlumnoComponent } from './frontend/cambio-de-password-alumno/cambio-de-password-alumno';
import { PantallaPrincipalAlumno } from './frontend/pantalla-principal-alumno/pantalla-principal-alumno';

export const routes: Routes = [
  { path: '', component: InicioDeSesionAlumnoComponent },
  { path: 'inicio-de-sesion', component: InicioDeSesionAlumnoComponent },
  { path: 'cambio-password', component: CambioDePasswordAlumnoComponent },
  { path: 'pantalla-principal-alumno', component: PantallaPrincipalAlumno }
];

