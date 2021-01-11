import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../Services/login.service';
import alertifyjs from 'AlertifyJS';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.Autenticado()){
      return true;
    }
    this.router.navigate(['/login']);
    alertifyjs
      .alert("Error Verifique.", "Ingrese sus credenciales.", function(){
      });
    return false;
  }

}
