import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { compras } from '../../model/compras';
const base_url = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private url=`${base_url}/compras`;
  private listaCambio = new Subject<compras[]>();
  private confirmDelete = new Subject<Boolean>()
  constructor(private http:HttpClient) { }

  list(){ return this.http.get<compras[]>(this.url);}

  //insertar
  insert(compras: compras){ return this.http.post(this.url,compras);}

  setList(listaNueva: compras[]){this.listaCambio.next(listaNueva);}

  getList(){return this.listaCambio.asObservable();}

  update(compras: compras) {
    return this.http.put(this.url + "/" + compras.id, compras);
  }

  listId(id: number) {
    return this.http.get<compras>(`${this.url}/${id}`);
  }



  delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }

  getConfirmDelete() {
    return this.confirmDelete.asObservable();
  }

  setConfirmDelete(status: Boolean) {
    this.confirmDelete.next(status);
  }

}
