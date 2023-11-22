import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { buys } from 'src/app/model/buys';
import { BuysService} from 'src/app/service/buys.service';
import {FormControl, FormGroup} from '@angular/forms';
import { user } from 'src/app/model/user';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-buys-insert',
  templateUrl: './buys-insert.component.html',
  styleUrls: ['./buys-insert.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})

export class BuysInsertComponent implements OnInit{
  // Formulario para la entrada de datos
  form:FormGroup = new FormGroup({});
   // Objeto para almacenar los datos de compra
  buys:buys =new buys();
  // Objeto para almacenar los datos del usuario
  user:user = new user();
  // Indica si la operación es de edición
  edicion:boolean = false;
  // Identificador de la compra actual
  id:number = 0 ;
  // Variables para manejar mensajes de validación
  showInvalidMessage: boolean = false;
  invalidMessageTimeout: any;
  constructor(private bS:BuysService,
               private router:Router,
               private route: ActivatedRoute){
               this.user = JSON.parse(localStorage.getItem('user')?? '{}');
               }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    // Inicialización del formulario
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

  // Método para procesar la inserción o actualización de una compra
  aceptar():void{
    // Reinicio de variables de mensajes de validación
    this.showInvalidMessage = false;
    clearTimeout(this.invalidMessageTimeout);

    // Asignación de valores desde el formulario al objeto de compra
    this.buys.id= this.form.value['id'];
    this.buys.model= this.form.value['model'];
    this.buys.price= this.form.value['price'];
    this.buys.currency= this.form.value['currency'];
    this.buys.plazo= this.form.value['plazo'];
    this.buys.type_interest_rate= this.form.value['type_interest_rate'];
    this.buys.type_grace_period= this.form.value['type_grace_period'];
    this.buys.interest_rate= this.form.value['interest_rate'];
    this.buys.grace_period= this.form.value['grace_period'];
    this.buys.couta_inicial_porcentaje= this.form.value['couta_inicial_porcentaje'];
    this.buys.Desgravamen=this.form.value['Desgravamen'];
    this.buys.userId=this.user.id;

    //Calculo de la Couta Incial
    this.buys.initial_fee = (this.buys.price*(this.buys.couta_inicial_porcentaje/100));

    //Calculo del credito
     this.buys.credit = (this.buys.price - this.buys.initial_fee );

    // Validaciones de los campos de inserción
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
    // Proceso de inserción o actualización
   if (this.edicion) {
      this.bS.update(this.buys).subscribe(() => {
        this.bS.list().subscribe(data => {
          this.bS.setList(data);
        });
      });
    } else {
      this.bS.insert(this.buys).subscribe(() => {
        this.bS.list().subscribe(data => {
          this.bS.setList(data);
       })
      })
    }
    // Navegación a la lista de compras
    this.router.navigate(['buys']);
  }
    else {
      // Manejo de mensajes de validación inválidos
      this.showInvalidMessage = true;
      this.invalidMessageTimeout = setTimeout(() => {
      this.showInvalidMessage = false;
    }, 2000);
  }
}

  // Método para inicializar la vista en caso de edición
  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe(data => {
        // Asignación de valores al formulario para edición
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
