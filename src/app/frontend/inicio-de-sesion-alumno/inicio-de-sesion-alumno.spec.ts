import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDeSesionAlumno } from './inicio-de-sesion-alumno';

describe('InicioDeSesionAlumno', () => {
  let component: InicioDeSesionAlumno;
  let fixture: ComponentFixture<InicioDeSesionAlumno>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioDeSesionAlumno]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioDeSesionAlumno);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
