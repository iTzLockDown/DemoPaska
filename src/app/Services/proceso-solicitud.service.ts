import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesoSolicitudService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/oficinacola";
  private oficinaColaUnica = 'colaunica';
  private oficinaColaMultiple = 'colamultiple';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService) {
  }

  private agregarAutorizacionHeader() {
    let token = this.loginService.token();
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private Autorizacion(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
} 
