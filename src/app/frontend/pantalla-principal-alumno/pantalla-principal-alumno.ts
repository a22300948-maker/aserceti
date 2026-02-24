import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla-principal-alumno',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./pantalla-principal-alumno.css'],
  templateUrl: './pantalla-principal-alumno.html'
})
export class PantallaPrincipalAlumno implements OnInit {

  materiasBasicas: any[] = [];
  materiasAdministrativas: any[] = [];
  materiasCarrera: any[] = [];

  alumno: any;

  asesores: any[] = [];
  horarios: any[] = [];

  materiaSeleccionada: any = null;
  asesorSeleccionado: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (!usuarioGuardado) {
      console.error("No hay usuario en localStorage");
      return;
    }

    this.alumno = JSON.parse(usuarioGuardado);

    console.log("Alumno cargado:", this.alumno);
  }

  // 🔥 Ahora SOLO se ejecuta cuando das click en "Ver mis materias"
  cargarMaterias(): void {

    if (!this.alumno?.id_usuario) {
      console.error("No existe id_usuario");
      return;
    }

    const url = `http://localhost:3000/api/auth/materias/${this.alumno.id_usuario}`;
    console.log("Consultando:", url);

    this.http.get<any>(url).subscribe({
      next: (response) => {
        console.log("Respuesta materias:", response);

        this.materiasBasicas = response.basicas || [];
        this.materiasAdministrativas = response.administrativas || [];
        this.materiasCarrera = response.carrera || [];
      },
      error: (error) => {
        console.error("Error al cargar materias:", error);
      }
    });
  }

  seleccionarMateria(materia: any): void {
    this.materiaSeleccionada = materia;
    this.asesorSeleccionado = null;
    this.horarios = [];

    const url = `http://localhost:3000/api/auth/asesores/${materia.id_materia}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.asesores = res || [];
        console.log("Asesores:", this.asesores);
      },
      error: (error) => {
        console.error("Error al cargar asesores:", error);
      }
    });
  }

  seleccionarAsesor(asesor: any): void {
    this.asesorSeleccionado = asesor;

    const url = `http://localhost:3000/api/auth/horarios/${asesor.IdAse}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.horarios = res || [];
        console.log("Horarios:", this.horarios);
      },
      error: (error) => {
        console.error("Error al cargar horarios:", error);
      }
    });
  }
}