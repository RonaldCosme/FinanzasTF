import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagadoComponent } from './pagado.component';

describe('PagadoComponent', () => {
  let component: PagadoComponent;
  let fixture: ComponentFixture<PagadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
