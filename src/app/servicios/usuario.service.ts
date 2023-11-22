import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarios } from '../../model/usuarios';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService  extends BaseService<usuarios>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/users';
  }
}
