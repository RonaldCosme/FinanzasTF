import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base
import { buys} from '../model/buys';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BuysService {
  private url=`${base_url}/buys`;
  private listaCambio = new Subject<buys[]>();
  private confirmDelete = new Subject<Boolean>()
  constructor(private http:HttpClient) { }

  list(){ return this.http.get<buys[]>(this.url);}

  //insertar
  insert(buys: buys){ return this.http.post(this.url,buys);}

  setList(listaNueva: buys[]){this.listaCambio.next(listaNueva);}

  getList(){return this.listaCambio.asObservable();}

  update(buys: buys) {
    return this.http.put(this.url + "/" + buys.id, buys);
  }

  listId(id: number) {
    return this.http.get<buys>(`${this.url}/${id}`);
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
