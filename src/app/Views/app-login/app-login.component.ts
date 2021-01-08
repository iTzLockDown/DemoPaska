import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Login} from '../../Models/login';
import {LoginService} from '../../Services/login.service';
import alertifyjs from 'AlertifyJS';
import {User} from '../../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html'
})
export class AppLoginComponent implements OnInit {
  usuario: Login;


  constructor(private router: Router, private login: LoginService ) {
    this.usuario=new Login();
  }

  ngOnInit(): void {
    if (this.login.Autenticado()){
      alertifyjs
        .alert("Información!!", "Ya estas Autenticado.", function(){
        });
      this.router.navigate(['/dashboard']);
    }
  }

  routerlink(): void{
    this.router.navigate(['/dashboard'])
  }

  login2() :void{
    if(this.usuario.Usuario ==null || this.usuario.Contrasenia ==null){
      alertifyjs
        .alert("Error Verifique.", "Ingrese sus credenciales.!!", function(){
          alertifyjs.error('Ingrese sus credenciales!!');
        });
      return;
    }
    this.login.login(this.usuario).subscribe(response =>{

      sessionStorage.setItem('token', response.Token);
      this.router.navigate(['/dashboard'])
      alertifyjs
        .alert("Informacion.", "Bienvenido a PASKA WEB.!!", function(){
        });
    }, error => {
        if (error.status==400){
          alertifyjs
            .alert("Información.", "Credenciales incorrectas.!!", function(){
            });
        }
    })
  }

}
