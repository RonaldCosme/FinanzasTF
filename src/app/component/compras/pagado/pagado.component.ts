import { Component } from '@angular/core';
import { compras } from '../../../../model/compras';
import { ComprasService } from '../../../servicios/compras.service';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pagado',
  templateUrl: './pagado.component.html',
  styleUrl: './pagado.component.css'
})
export class PagadoComponent implements OnInit {
  compras: compras | undefined;
  displayedColumns: string[] = ['Mes','Saldo Inicial',  'Interes','Couta',
                                'Amortizacion','Desgravamen', 'Balance','Flujo'];
  dataTable: MatTableDataSource<any>;
  saldoInicial: number = 0;
  flujo: number = 0;
  finance: any;
  constructor(
    private route: ActivatedRoute,
    private comprasService: ComprasService
  ){
    this.dataTable = new MatTableDataSource<any>();}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const buysId = +params['id'];
      this.getBuysDetails(buysId);});
  }
  getBuysDetails(id: number) {
    this.comprasService.listId(id).subscribe((data: compras) =>
    { this.compras = data;
      this.calculatePayments();});
  }
  calculatePayments() {
    if (this.compras) {

      let planData: any[] = [];
      let plazo_mensual = this.compras.plazo * 12;
      let tasa_mensual: number = 0;
      let tasa_anual_dividida: number = this.compras.interest_rate / 100;
      switch (this.compras.type_interest_rate) {
        case 'TEA':
          tasa_mensual = Math.pow(1 + (tasa_anual_dividida), 1 / 12) - 1;
          break;
        case 'TNA':
          tasa_mensual = (tasa_anual_dividida / 12);
          break;
        default:
          this.compras.interest_rate = 0;
          break;
      }

      planData.push({
        Mes: 0,
        Couta: "-",
        Interes:  "-",
        Amortizacion:  "-",
        Balance:"-",
        'Saldo Inicial':"-",
        'Flujo': this.compras.currency + " " + this.compras.credit.toFixed(2),
        'Desgravamen':"-",
      });

      let flujoCaja: number[] = [];
      flujoCaja.push(-this.compras.credit);
      const graceType = this.compras.type_grace_period
      const graceDuration = this.compras.grace_period;
      let saldo_prestamo = this.compras.credit;
      let saldo_inicial = 0;
      let saldo_actualizado = 0;
      let contador = plazo_mensual;
      let cuota = 0;
      let amortizacion = 0;
      let monto_desgravamen: number = 0;
      let flujos_mostrar:number = 0;
      let flujos:number = 0;
      let tasa_descuento = 0.02;
      let VAN:number = this.compras.credit;


      for (let i = 1; i <= plazo_mensual; i++) {
        let month = i;
        saldo_inicial = saldo_prestamo;
        let interes_mensual = saldo_prestamo * tasa_mensual;
        if (graceType === 'PARCIAL' && i <= graceDuration) {
          if(this.compras.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.compras.Desgravamen == 'BancoB'){
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
          if(this.compras.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.compras.Desgravamen == 'BancoB'){
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
          if(this.compras.Desgravamen == 'BancoA'){
            monto_desgravamen = (saldo_prestamo) * 0.0005511;
          }else if(this.compras.Desgravamen == 'BancoB'){
            monto_desgravamen = (saldo_prestamo) * 0.00077;
          }else{monto_desgravamen = (saldo_prestamo) * 0.001045;}
          interes_mensual = saldo_prestamo * tasa_mensual;
          cuota = ((graceType === 'TOTAL' ? saldo_actualizado : this.compras.credit) * (tasa_mensual))
                  / (1 - Math.pow(1 + tasa_mensual, -contador ));

          amortizacion = cuota - interes_mensual;
          flujos_mostrar = cuota;
          flujos_mostrar = -flujos_mostrar
          flujos = cuota;
          flujoCaja.push(flujos);

        }
        saldo_prestamo -= amortizacion;

    VAN+= flujos_mostrar/Math.pow(1+( tasa_descuento ),i);

    planData.push({
          Mes: month,
          Couta: this.compras.currency + " " + cuota.toFixed(2),
          Interes: this.compras.currency + " " + interes_mensual.toFixed(2),
          Amortizacion: this.compras.currency + " " + amortizacion.toFixed(2),
          Balance: this.compras.currency + " " + saldo_prestamo.toFixed(2),
          'Saldo Inicial': this.compras.currency + " " + saldo_inicial.toFixed(2),
          'Flujo': this.compras.currency + " " + flujos_mostrar.toFixed(2),
          'Desgravamen': this.compras.currency + " " + monto_desgravamen.toFixed(2),
        });


      }

      this.dataTable.data = planData;
      VAN = Number(VAN.toFixed(1));
      this.compras.VAN = VAN;
      this.compras.TIR = this.calculateTIR(flujoCaja);

    }
  }

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
        return x1*100; 
      }
      x0 = x1;
    }
    return 0;
  }
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
    saveAs(blob, 'Finazas-Pagos.xlsx');
  }
  private parseNumber(value: string): number {
    return Number(value.replace(/[^\d.-]/g, ''));
  }

}
