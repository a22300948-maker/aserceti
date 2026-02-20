import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioDePasswordAlumnoComponent } from './cambio-de-password-alumno';

describe('CambioDePasswordAlumnoComponent', () => {
  let component: CambioDePasswordAlumnoComponent;
  let fixture: ComponentFixture<CambioDePasswordAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambioDePasswordAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambioDePasswordAlumnoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
