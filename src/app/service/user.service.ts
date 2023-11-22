import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BaseService } from './base.service';
import {user} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<user>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath = 'http://localhost:3000/users';
  }
}
