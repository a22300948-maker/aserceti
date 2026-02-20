import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioDeSesionAlumnoComponent } from './inicio-de-sesion-alumno';

describe('InicioDeSesionAlumnoComponent', () => {
  let component: InicioDeSesionAlumnoComponent;
  let fixture: ComponentFixture<InicioDeSesionAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioDeSesionAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioDeSesionAlumnoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
