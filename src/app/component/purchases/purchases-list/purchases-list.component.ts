import { Component, OnInit,ViewChild } from '@angular/core';
import { purchases } from 'src/app/model/purchases';
import {MatTableDataSource} from '@angular/material/table'
import { PurchasesService } from 'src/app/service/purchases.service';
import { MatPaginator } from '@angular/material/paginator';
import { user } from 'src/app/model/user';
import { DarkModeService } from 'src/app/dark-mode.service';

@Component({
  selector: 'app-purchases-list',
  templateUrl: './purchases-list.component.html',
  styleUrls: ['./purchases-list.component.css']
})

export class PurchasesListComponent implements OnInit{
  // Variables para almacenar información del usuario y la lista de creditos
  user:user = new user();
  ttlista:purchases[]=[];
  id: number = 0;
  ttdataSource:MatTableDataSource<purchases> = new MatTableDataSource();
  ttdisplayedColumns:string[] = ['id','model','currency','plazo',
  'type_interest_rate','interest_rate','type_grace_period',
  'grace_period','price','initial_fee','credit','acciones'];

  // Variable para el valor más grande del ID
  private idMayor: number = 0;

  // Referencia al paginador de la tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;

   // Constructor con servicios y herramientas necesarios
  constructor(
    private bS:PurchasesService,
    private darkModeService: DarkModeService
    ){
      // Inicialización del usuario desde el almacenamiento local
      this.user = JSON.parse(localStorage.getItem('user')?? '{}');
    }

  ngOnInit(): void {
    // Obtener y mostrar cotizaciones realizadas por el usuario
    this.getByLoans();
    // Actualizar el tema oscuro
    this.updateTheme();
  }

  // Método para obtener las creditos realizadas por el usuario
  async getByLoans() {
    // Obtener la lista de creditos vehiculares
    this.bS.list().subscribe((response: any) => {
      // Filtrar las registros por el ID del usuario actual
      response.forEach((element:any)=>{
        if(element.userId===this.user.id){
           // Agregar el registro al origen de datos de la tabla
          this.ttdataSource.data.push(element);
          // Asignar el paginador a la tabla
          this.ttdataSource.paginator = this.paginator;
        }
      })
    });

    // Obtener y mostrar la lista actualizada de compras
    this.bS.getList().subscribe((updatedList: purchases[]) => {
      // Filtrar la lista por el ID del usuario actual
      const filteredList = updatedList.filter(element => element.userId === this.user.id);
      // Actualizar los datos de la tabla
      this.ttdataSource.data = filteredList;
      // Asignar el paginador a la tabla actualizada
      this.ttdataSource.paginator = this.paginator;
    });


  }


  // Método para limpiar el filtro de la tabla
  clearFilter() {
    this.ttdataSource.filter = '';
  }

  // Método para filtrar la tabla por un evento de entrada
  filter(event: any) {
    this.ttdataSource.filter = event.target.value.trim();
  }

  // Método para alternar el modo oscuro
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  // Método para actualizar el tema oscuro
  private updateTheme() {
    // Verificar si el modo oscuro está habilitado y
    //aplicar la clase correspondiente al cuerpo del documento
    if (this.darkModeService.isDarkModeEnabled()) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  }





