import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsertarComprasComponent } from './isertar-compras.component';

describe('IsertarComprasComponent', () => {
  let component: IsertarComprasComponent;
  let fixture: ComponentFixture<IsertarComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsertarComprasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsertarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
