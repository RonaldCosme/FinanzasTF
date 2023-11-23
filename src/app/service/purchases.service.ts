import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base
import { purchases} from '../model/purchases';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  private url=`${base_url}/purchases`;
  private listaCambio = new Subject<purchases[]>();
  private confirmDelete = new Subject<Boolean>()
  constructor(private http:HttpClient) { }

  list(){ return this.http.get<purchases[]>(this.url);}

  //insertar
  insert(purchases: purchases){ return this.http.post(this.url,purchases);}

  setList(listaNueva: purchases[]){this.listaCambio.next(listaNueva);}

  getList(){return this.listaCambio.asObservable();}

  update(purchases: purchases) {
    return this.http.put(this.url + "/" + purchases.id, purchases);
  }

  listId(id: number) {
    return this.http.get<purchases>(`${this.url}/${id}`);
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
