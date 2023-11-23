import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class LoginComponent {
  // Variables para almacenar el correo electrónico, contraseña y estado de mensaje inválido
  email: string;
  password: string;
  showInvalidMessage: boolean = false;

  // Referencia al formulario de inicio de sesión y al mensaje de error
  @ViewChild('loginForm', { static: true })
  loginForm!: NgForm;
  @ViewChild('invalidMessage', { static: true })
  invalidMessage!: ElementRef;

  // Constructor que inicializa las variables y recibe servicios necesario
  constructor(private userService: UserService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  // Método para realizar el inicio de sesión
  async login() {
    // Inicialización del estado de mensaje inválido
    this.showInvalidMessage = false;
    // Obtener la lista de usuarios desde el servicio
    this.userService.getAll().subscribe((response: any) => {
      // Variable para verificar las credenciales válidas
      let validCredentials = false;
      // Iterar sobre la lista de usuarios
      response.forEach((element: any) => {
        // Verificar coincidencia de correo electrónico y contraseña
        if (element.email === this.email && element.password === this.password) {
          // Almacenar la información del usuario en el almacenamiento local
          localStorage.setItem('user', JSON.stringify(element));
          localStorage.setItem('isAuthenticated', 'true');
          // Navegar a la página principal
          this.navigateToHome();
          validCredentials = true;
        }
      });

      // Mostrar mensaje de error si las credenciales no son válidas
      if (!validCredentials) {
        this.showInvalidMessage = true;

        // Ocultar el mensaje después de 2 segundo
        setTimeout(() => {
          this.showInvalidMessage = false;
        }, 2000);
      }
    });
  }

  // Método para navegar a la página principal después del inicio de sesión
  navigateToHome() {
    this.router.navigate(['/purchases']);
  }
}
