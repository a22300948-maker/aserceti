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
    // Aquí puedes agregar la lógica para manejar el inicio de sesión del alumno
    // Por ejemplo, puedes validar las credenciales ingresadas y redirigir al alumno a la página principal si son correctas
    this.authService.login({ usuario: this.username, password: this.password }).subscribe(
      (success: any) => {
        if (success) {
          // Redirigir al alumno a la página principal
          this.router.navigate(['/pantalla-principal-alumno']);
          console.log('Inicio de sesión exitoso');
        } else {
          // Mostrar un mensaje de error si las credenciales son incorrectas
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          console.error('Credenciales incorrectas');
        }
      },
      (error: any) => {
        // Manejar cualquier error que ocurra durante el proceso de inicio de sesión
        console.error('Error durante el inicio de sesión:', error);
        alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    );
  }
}