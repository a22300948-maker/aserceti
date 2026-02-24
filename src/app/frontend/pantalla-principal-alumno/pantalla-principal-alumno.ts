  import { Component, OnInit } from '@angular/core';
  import { RouterModule } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import { HttpClientModule } from '@angular/common/http';
  import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-pantalla-principal-alumno',
    standalone: true,
    imports: [RouterModule, HttpClientModule, CommonModule],
    styleUrls: ['./pantalla-principal-alumno.css'],
    templateUrl: './pantalla-principal-alumno.html',
  })
  export class PantallaPrincipalAlumno implements OnInit {

    materiasBasicas: any[] = [];
    materiasAdministrativas: any[] = [];
    materiasCarrera: any[] = [];
    alumno: any;
    asesores: any[] = [];
    materias: any[] = [];
    horarios: any[] = [];
    
    materiaSeleccionada: any = null;
    asesorSeleccionado: any = null;

    constructor(private http: HttpClient) { }

    ngOnInit() {
      const usuarioGuardado = localStorage.getItem('usuario');
      console.log("Datos guardados en localStorage:", usuarioGuardado);

      if (usuarioGuardado) {
        const datosParseados = JSON.parse(usuarioGuardado);
        console.log("Datos parseados:", datosParseados);

        // Si se guardó como {success: true, usuario: {...}}
        if (datosParseados.usuario) {
          this.alumno = datosParseados.usuario;
        } 
        // Si se guardó como {...} directamente
        else {
          this.alumno = datosParseados;
        }

        console.log("Alumno final:", this.alumno);
        console.log("ID Usuario:", this.alumno?.id_usuario);

        if (this.alumno?.id_usuario) {
          this.cargarMaterias();
        } else {
          console.error("El alumno no tiene id_usuario");
        }
      } else {
        console.error("No hay usuario guardado en localStorage");
      }
    }
    
    cargarMaterias() {
      const url = `http://localhost:3000/api/auth/materias/${this.alumno.id_usuario}`;
      console.log("URL enviada:", url);

      this.http.get<any>(url)
        .subscribe({
          next: (response) => {
            console.log("Respuesta completa:", response);

            // Asignar directamente sin verificar success
            this.materiasBasicas = response.basicas || [];
            this.materiasAdministrativas = response.administrativas || [];
            this.materiasCarrera = response.carrera || [];
            
            console.log("Materias Básicas:", this.materiasBasicas);
            console.log("Materias Administrativas:", this.materiasAdministrativas);
            console.log("Materias Carrera:", this.materiasCarrera);

            // Forzar detección de cambios
          },
          error: (error) => {
            console.error("Error al cargar materias:", error);
          }
        });
    }
    seleccionarMateria(materia: any) {
    this.materiaSeleccionada = materia;
    this.asesorSeleccionado = null;

    this.http.get<any>(`http://localhost:3000/api/auth/asesores/${materia.id_materia}`)
      .subscribe({
        next: (res) => {
          this.asesores = res || [];
          console.log("Asesores:", this.asesores);
        },
        error: (error) => {
          console.error("Error al cargar asesores:", error);
        }
      });
  }

  seleccionarAsesor(asesor: any) {
    this.asesorSeleccionado = asesor;

    this.http.get<any>(`http://localhost:3000/api/auth/horarios/${asesor.IdAse}`)
      .subscribe({
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