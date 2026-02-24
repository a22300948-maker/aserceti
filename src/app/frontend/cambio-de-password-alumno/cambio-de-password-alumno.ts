import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cambio-de-password-alumno',
  standalone: true, // 🔥 ESTO FALTABA
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cambio-de-password-alumno.html',
  styleUrls: ['./cambio-de-password-alumno.css']
})
export class CambioDePasswordAlumnoComponent {

  username: string = '';
  nombre: string = '';
  password: string = '';
  semestre: string = '';
  nivel: string = '';
  id_carrera: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    this.authService.CambioPassword({ 
      usuario: this.username, 
      nombre: this.nombre,
      password: this.password,
      semestre: this.semestre,
      nivel: this.nivel,
      id_carrera: this.id_carrera
    }).subscribe(
      (response: any) => {
        if (response && response.success) {
          this.router.navigate(['/pantalla-principal-alumno']);
        } else {
          alert('Error al cambiar la contraseña.');
        }
      },
      (error: any) => {
        console.error('Error:', error);
        alert('Error en el servidor.');
      }
    );
  }
}