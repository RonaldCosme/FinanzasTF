import { Component } from '@angular/core';
import { compras } from '../../../../model/compras';
import { usuarios } from '../../../../model/usuarios';
import { ComprasService } from '../../../servicios/compras.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-isertar-compras',
  templateUrl: './isertar-compras.component.html',
  styleUrl: './isertar-compras.component.css'
})
export class IsertarComprasComponent implements OnInit {

   form:FormGroup = new FormGroup({});
  compras:compras =new compras();
  usuarios:usuarios = new usuarios();
  edicion:boolean = false;
  id:number = 0 ;
  showInvalidMessage: boolean = false;
  invalidMessageTimeout: any;
  constructor(private bS:ComprasService,
               private router:Router,
               private route: ActivatedRoute){
               this.usuarios = JSON.parse(localStorage.getItem('user')?? '{}');
               }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

   this.form = new FormGroup({
      id:new FormControl(),
      model:new FormControl(),
      price:new FormControl(),
      currency:new FormControl(),
      plazo:new FormControl(),
      type_interest_rate:new FormControl(),
      type_grace_period:new FormControl(),
      interest_rate:new FormControl(),
      grace_period:new FormControl(),
      couta_inicial_porcentaje:new FormControl(),
      periodo_tasa:new FormControl(),
      tipo_periodo_tasa:new FormControl(),
      Desgravamen:new FormControl(),
    });
  }

  aceptar():void{
    this.showInvalidMessage = false;
    clearTimeout(this.invalidMessageTimeout);

    this.compras.id= this.form.value['id'];
    this.compras.model= this.form.value['model'];
    this.compras.price= this.form.value['price'];
    this.compras.currency= this.form.value['currency'];
    this.compras.plazo= this.form.value['plazo'];
    this.compras.type_interest_rate= this.form.value['type_interest_rate'];
    this.compras.type_grace_period= this.form.value['type_grace_period'];
    this.compras.interest_rate= this.form.value['interest_rate'];
    this.compras.grace_period= this.form.value['grace_period'];
    this.compras.couta_inicial_porcentaje= this.form.value['couta_inicial_porcentaje'];
    this.compras.Desgravamen=this.form.value['Desgravamen'];
    this.compras.userId=this.usuarios.id;
    this.compras.initial_fee = (this.compras.price*(this.compras.couta_inicial_porcentaje/100));
     this.compras.credit = (this.compras.price - this.compras.initial_fee );
    if(this.form.value['model'].length>0 &&
    this.form.value['currency'].length>0 &&
    this.form.value['type_interest_rate'].length>0 &&
    this.form.value['Desgravamen'].length>0 &&
    (this.form.value['couta_inicial_porcentaje'] >= 10 &&
    this.form.value['couta_inicial_porcentaje'] <= 30) &&
    this.form.value['type_grace_period'].length>0 &&
    (this.form.value['interest_rate'] >= 5 && this.form.value['interest_rate'] <= 20) &&
    (this.form.value['grace_period'] > 0 && this.form.value['grace_period'] < 7) &&
    (this.form.value['plazo'] > 0 && this.form.value['plazo'] <= 6) &&
    (this.form.value['price'] >= 10000 && this.form.value['price'] <= 9999999)
    ){
   if (this.edicion) {
      this.bS.update(this.compras).subscribe(() => {
        this.bS.list().subscribe(data => {
          this.bS.setList(data);
        });
      });
    } else {
      this.bS.insert(this.compras).subscribe(() => {
        this.bS.list().subscribe(data => {
          this.bS.setList(data);
       })
      })
    }
    this.router.navigate(['buys']);
  }
    else {
      this.showInvalidMessage = true;
      this.invalidMessageTimeout = setTimeout(() => {
      this.showInvalidMessage = false;
    }, 2000);
  }
}
  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          model: new FormControl(data.model),
          price: new FormControl(data.price),
          currency: new FormControl(data.currency),
          plazo: new FormControl(data.plazo),
          type_interest_rate: new FormControl(data.type_interest_rate),
          type_grace_period: new FormControl(data.type_grace_period),
          grace_period:new FormControl(data.grace_period),
          interest_rate:new FormControl(data.interest_rate),
          couta_inicial_porcentaje:new FormControl(data.couta_inicial_porcentaje),
          Desgravamen:new FormControl(data.Desgravamen)
        });
        console.log(data);
      });
    }
  }

}
