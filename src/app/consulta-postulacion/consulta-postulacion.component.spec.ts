import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPostulacionComponent } from './consulta-postulacion.component';

describe('ConsultaPostulacionComponent', () => {
  let component: ConsultaPostulacionComponent;
  let fixture: ComponentFixture<ConsultaPostulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaPostulacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaPostulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
