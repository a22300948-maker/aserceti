import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inicio-de-sesion-alumno',
  templateUrl: './inicio-de-sesion-alumno.html',
  styleUrls: ['./inicio-de-sesion-alumno.css'],
  imports: [RouterModule, FormsModule]
})

export class InicioDeSesionAlumnoComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.authService.login({ usuario: this.username, password: this.password }).subscribe(
      (response: any) => {
        if (response && response.usuario) {
          // Redirigir al alumno a la página principal
          this.router.navigate(['/pantalla-principal-alumno']);
        } else {
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          console.error('Credenciales incorrectas');
        }
      },
      (error: any) => {
        console.error('Error durante el inicio de sesión:', error);
        alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }
}