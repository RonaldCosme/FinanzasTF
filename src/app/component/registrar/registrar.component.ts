import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { usuarios } from '../../../model/usuarios';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent  implements OnInit{
  userData: usuarios;
  dataSource: MatTableDataSource<any>;
  password: string[];

  @ViewChild('userForm', { static: true })
  userForm!: NgForm;

  constructor(private userService: UsuarioService, private router: Router) {
    this.userData = {} as usuarios;
    this.dataSource = new MatTableDataSource<any>();
    this.password = ['', ''];
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  addUser() {
    if (this.isDuplicateUser(this.userData) || this.password[0]!==this.password[1]) {
      console.log("Error: El usuario ya existe o las contraseñas no coinciden");
      return;
    }

    this.userData.password=this.password[0];
    this.userService.create(this.userData).subscribe((response: any) => {

      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.navigateToHome();
    });
  }

  isDuplicateUser(user: usuarios): boolean {
    return this.dataSource.data.some(
      (existingUser: usuarios) =>
        existingUser.userName === user.userName ||
        existingUser.email === user.email
    );
  }

  navigateToHome(){
    this.resetForm();
    this.router.navigate(['/']);
  }

  resetForm(){
    this.userForm.resetForm();
  }

  onSubmit() {
    if (this.userForm.form.valid && this.isEmailValid()) {
      console.log('usuario invalido');
      this.addUser();
    }
  }

  isEmailValid(): boolean {
    const requiredDomain = '@finanzas.com';

    if (this.userData.email.endsWith(requiredDomain)) {
      return true;
    } else {
      console.log('Error: El correo electrónico debe tener la extensión @finanzas.com');
      return false;
    }
  }

}
