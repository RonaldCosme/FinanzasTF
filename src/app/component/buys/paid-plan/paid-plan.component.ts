import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuysService } from 'src/app/service/buys.service';
import { buys } from 'src/app/model/buys';
import { MatTableDataSource } from "@angular/material/table";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-paid-plan',
  templateUrl: './paid-plan.component.html',
  styleUrls: ['./paid-plan.component.css']
})
export class PaidPlanComponent implements OnInit {
  // Objeto que almacenará los detalles de la compra
  buys: buys | undefined;
  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['Mes','Saldo Inicial',  'Interes','Couta',
                                'Amortizacion','Desgravamen', 'Balance','Flujo'];
  // Fuente de datos para la tabla
  dataTable: MatTableDataSource<any>;
  saldoInicial: number = 0;
  flujo: number = 0;
  finance: any;
  constructor(
    private route: ActivatedRoute,
    private buysService: BuysService
  ){
     // Inicialización de la fuente de datos de la tabla
    this.dataTable = new MatTableDataSource<any>();}

  ngOnInit(): void {
    // Suscripción a los parámetros de la ruta para obtener el ID de la compra
    this.route.params.subscribe((params: Params) => {
      const buysId = +params['id'];
    // Obtener los detalles de la compra con el ID proporcionado
      this.getBuysDetails(buysId);});
  }


  // Obtener los detalles de la compra con el ID proporcionado
  getBuysDetails(id: number) {
    this.buysService.listId(id).subscribe((data: buys) =>
    { this.buys = data;
       // Calcular los pagos del plan de pagos
      this.calculatePayments();});
  }
  // Calcular los pagos del plan de pagos
  calculatePayments() {
    if (this.buys) {

      let planData: any[] = [];
      let plazo_mensual = this.buys.plazo * 12;
      //Calculo de la tasa mensual
      let tasa_mensual: number = 0;
      let tasa_anual_dividida: number = this.buys.interest_rate / 100;
      switch (this.buys.type_interest_rate) {
        case 'TEA':
          tasa_mensual = Math.pow(1 + (tasa_anual_dividida), 1 / 12) - 1;
          break;
        case 'TNA':
          tasa_mensual = (tasa_anual_dividida / 12);
          break;
        default:
          this.buys.interest_rate = 0;
          break;
      }

      //Primer registro en 0
      planData.push({
        Mes: 0,
        Couta: "-",
        Interes:  "-",
        Amortizacion:  "-",
        Balance:"-",
        'Saldo Inicial':"-",
        'Flujo': this.buys.currency + " " + this.buys.credit.toFixed(2),
        'Desgravamen':"-",
      });


      let flujoCaja: number[] = [];
      flujoCaja.push(-this.buys.credit);
      const graceType = this.buys.type_grace_period
      const graceDuration = this.buys.grace_period;
      let saldo_prestamo = this.buys.credit;
      let saldo_inicial = 0;
      let saldo_actualizado = 0;
      let contador = plazo_mensual;
      let cuota = 0;
      let amortizacion = 0;
      let monto_desgravamen: number = 0;
      let flujos_mostrar:number = 0;
      let flujos:number = 0;
      let tasa_descuento = 0.02;
      let VAN:number = this.buys.credit;


      for (let i = 1; i <= plazo_mensual; i++) {
        let month = i;
        saldo_inicial = saldo_prestamo;
        let interes_mensual = saldo_prestamo * tasa_mensual;
        if (graceType === 'PARCIAL' && i <= graceDuration) {
          // Cálculo de monto de desgravamen para periodo de gracia parcial
          if(this.buys.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.buys.Desgravamen == 'BancoB'){
            monto_desgravamen = (saldo_prestamo) * 0.00077;
          }else{monto_desgravamen = (saldo_prestamo) * 0.001045;}
          flujos_mostrar = monto_desgravamen;
          flujos_mostrar = -flujos_mostrar
          flujos = monto_desgravamen;
          cuota = interes_mensual;
          amortizacion = 0;
          flujoCaja.push(flujos);
          contador--;

        } else if(graceType === 'TOTAL' && i <= graceDuration) {
        // Cálculo de monto de desgravamen para periodo de gracia total
          if(this.buys.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.buys.Desgravamen == 'BancoB'){
            monto_desgravamen = (saldo_prestamo) * 0.00077;
          }else{monto_desgravamen = (saldo_prestamo) * 0.001045;}

          flujos_mostrar = monto_desgravamen;
          flujos_mostrar = -flujos_mostrar
          flujos = monto_desgravamen;
          cuota = 0;
          amortizacion = 0;
          interes_mensual = saldo_prestamo * tasa_mensual;
          saldo_prestamo = saldo_prestamo + interes_mensual;
          saldo_actualizado = saldo_prestamo;
          contador--;
          flujoCaja.push(flujos);

        } else {
          // Cálculo de monto de desgravamen para periodo regular
          if(this.buys.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.buys.Desgravamen == 'BancoB'){
            monto_desgravamen = (saldo_prestamo) * 0.00077;
          }else{monto_desgravamen = (saldo_prestamo) * 0.001045;}
          interes_mensual = saldo_prestamo * tasa_mensual;
          cuota = ((graceType === 'TOTAL' ? saldo_actualizado : this.buys.credit) * (tasa_mensual))
                  / (1 - Math.pow(1 + tasa_mensual, -contador ));

          amortizacion = cuota - interes_mensual;
          flujos_mostrar = cuota;
          flujos_mostrar = -flujos_mostrar
          flujos = cuota;
          flujoCaja.push(flujos);

        }
        saldo_prestamo -= amortizacion;

    // Calculo de VAN
    VAN+= flujos_mostrar/Math.pow(1+( tasa_descuento ),i);

    planData.push({
          Mes: month,
          Couta: this.buys.currency + " " + cuota.toFixed(2),
          Interes: this.buys.currency + " " + interes_mensual.toFixed(2),
          Amortizacion: this.buys.currency + " " + amortizacion.toFixed(2),
          Balance: this.buys.currency + " " + saldo_prestamo.toFixed(2),
          'Saldo Inicial': this.buys.currency + " " + saldo_inicial.toFixed(2),
          'Flujo': this.buys.currency + " " + flujos_mostrar.toFixed(2),
          'Desgravamen': this.buys.currency + " " + monto_desgravamen.toFixed(2),
        });


      }

      this.dataTable.data = planData;
      VAN = Number(VAN.toFixed(1));
      this.buys.VAN = VAN;
      this.buys.TIR = this.calculateTIR(flujoCaja);

    }
  }

  //CALCULO DEL TIR
  calculateTIR(flujoCaja: number[]): number {
    let x0 = 0.1;
    let maxIterations = 100;
    let tolerance = 0.0001;

    for (let i = 0; i < maxIterations; i++) {
      let fValue = 0;
      let fPrimeValue = 0;

      for (let j = 1; j <= flujoCaja.length; j++) {
        fValue += flujoCaja[j - 1] / Math.pow(1 + x0, j);
        fPrimeValue -= j * flujoCaja[j - 1] / Math.pow(1 + x0, j + 1);
      }
      let x1 = x0 - fValue / fPrimeValue;
      if (Math.abs(x1 - x0) < tolerance) {
        return x1*100; // Convertirmos a porcentajes
      }
      x0 = x1;
    }
    // Si no converge, retorna un valor por defecto
    return 0;
  }


  // Metodo para exportar la tabla del plan de pagos a formato EXCEL
  exportToExcel(): void {
    const dataToExport = this.dataTable.data.map((item, index) => ({
      Mes: item.Mes,
      'Saldo Inicial': this.parseNumber(item['Saldo Inicial']),
      Interes: this.parseNumber(item.Interes),
      Couta: this.parseNumber(item.Couta),
      Amortizacion: this.parseNumber(item.Amortizacion),
      'Desgravamen': this.parseNumber(item['Desgravamen']),
      Balance: this.parseNumber(item.Balance),
      'Flujo': this.parseNumber(item['Flujo']),
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Plan de Pagos');
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'Credicar_Plan_Pagos.xlsx');
  }
  // Función para convertir texto a número eliminando símbolos de moneda
  private parseNumber(value: string): number {
    // Eliminar símbolos de moneda y convertir a número
    return Number(value.replace(/[^\d.-]/g, ''));
  }
}
