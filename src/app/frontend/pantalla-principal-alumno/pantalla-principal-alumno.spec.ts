import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaPrincipalAlumno } from './pantalla-principal-alumno';

describe('PantallaPrincipalAlumno', () => {
  let component: PantallaPrincipalAlumno;
  let fixture: ComponentFixture<PantallaPrincipalAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaPrincipalAlumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaPrincipalAlumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
