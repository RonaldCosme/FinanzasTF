import { Component } from '@angular/core';
import { usuarios } from '../../../../model/usuarios';
import { compras } from '../../../../model/compras';
import { ComprasService } from '../../../servicios/compras.service';
import { OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-compras',
  templateUrl: './listar-compras.component.html',
  styleUrl: './listar-compras.component.css'
})
export class ListarComprasComponent  implements OnInit{
usuarios:usuarios = new usuarios();
ttlista:compras[]=[];
id: number = 0;
ttdataSource:MatTableDataSource<compras> = new MatTableDataSource();
ttdisplayedColumns:string[] = ['id','model','currency','plazo',
'type_interest_rate','interest_rate','type_grace_period',
'grace_period','price','initial_fee','credit','acciones'];

private idMayor: number = 0;

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(
  private bS: ComprasService,
  ){
    this.usuarios = JSON.parse(localStorage.getItem('user')?? '{}');
  }

ngOnInit(): void {
  this.getByLoans();
}
async getByLoans() {
  this.bS.list().subscribe((response: any) => {
    response.forEach((element:any)=>{
      if(element.userId===this.usuarios.id){
        this.ttdataSource.data.push(element);
        this.ttdataSource.paginator = this.paginator;
      }
    })
  });
  this.bS.getList().subscribe((updatedList: compras[]) => {
    const filteredList = updatedList.filter(element => element.userId === this.usuarios.id);
    this.ttdataSource.data = filteredList;
    this.ttdataSource.paginator = this.paginator;
  });

}
clearFilter() {
  this.ttdataSource.filter = '';
}
filter(event: any) {
  this.ttdataSource.filter = event.target.value.trim();
}

}
