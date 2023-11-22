import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string;
  password: string;
  showInvalidMessage: boolean = false;

  @ViewChild('loginForm', { static: true })
  loginForm!: NgForm;
  @ViewChild('invalidMessage', { static: true })
  invalidMessage!: ElementRef;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.email = '';
    this.password = '';
  }

  async login() {
    this.showInvalidMessage = false;
    this.usuarioService.getAll().subscribe((response: any) => {
      let validCredentials = false;
      response.forEach((element: any) => {
        if (element.email === this.email && element.password === this.password) {
          localStorage.setItem('user', JSON.stringify(element));
          localStorage.setItem('isAuthenticated', 'true');
          this.navigateToHome();
          validCredentials = true;
        }
      });

      if (!validCredentials) {
        this.showInvalidMessage = true;
        setTimeout(() => {
          this.showInvalidMessage = false;
        }, 2000);
      }
    });
  }
  navigateToHome() {
    this.router.navigate(['/buys']);
  }

}
