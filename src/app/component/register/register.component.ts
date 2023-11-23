import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {user} from "../../model/user";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  userData: user;
  dataSource: MatTableDataSource<any>;
  password: string[];

  // Referencia al formulario en el template
  @ViewChild('userForm', { static: true })
  userForm!: NgForm;

  constructor(private userService: UserService, private router: Router) {
    // Inicialización de variables
    this.userData = {} as user;
    this.dataSource = new MatTableDataSource<any>();
    this.password = ['', ''];
  }

  ngOnInit(): void {
  // Obtener todos los usuarios al inicializar el componente
    this.getAllUsers();
  }

  // Obtener todos los usuarios desde el servicio
  getAllUsers() {
    this.userService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  // Agregar un nuevo usuario
  addUser() {
    // Validar duplicados y coincidencia de contraseñas
    if (this.isDuplicateUser(this.userData) || this.password[0]!==this.password[1]) {
      console.log("Error: la contraseña no coincide o ya existe un usuario con el mismo UserName o email.");
      return;
    }

    // Asignar la contraseña al usuario y realizar la creación
    this.userData.password=this.password[0];
    this.userService.create(this.userData).subscribe((response: any) => {

      // Actualizar la lista de usuarios y navegar a la página principal
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.navigateToHome();
    });
  }

  // Verificar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
  isDuplicateUser(user: user): boolean {
    return this.dataSource.data.some(
      (existingUser: user) =>
        existingUser.userName === user.userName ||
        existingUser.email === user.email
    );
  }

  // Navegar a la página principal y resetear el formulario
  navigateToHome(){
    this.resetForm();
    this.router.navigate(['/']);
  }

  // Resetear el formulario
  resetForm(){
    this.userForm.resetForm();
  }

  // Manejar la presentación del formulario
  onSubmit() {
    // Si el formulario es válido y el correo es válido, agregar el usuario
    if (this.userForm.form.valid && this.isEmailValid()) {
      console.log('user valid');
      this.addUser();
    }
  }

  // Verificar si el correo electrónico tiene la extensión requerida
  isEmailValid(): boolean {
    const requiredDomain = '@finanzas.tf';

    if (this.userData.email.endsWith(requiredDomain)) {
      return true;
    } else {
      console.log('Error: El correo electrónico debe tener la extensión @finanzas.tf');
      return false;
    }
  }
}
