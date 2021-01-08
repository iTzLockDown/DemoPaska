import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {Observable, throwError} from 'rxjs';
import {TipoRequisito} from '../Models/Response/TipoRequisito';
import {catchError} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {SituacionResponse} from '../Models/Response/SituacionResponse';
@Injectable({
  providedIn: 'root'
})
export class SituacionSolicitudService {
  private urlEndPoint: string = "http://200.60.61.250:8007/api/situacionsolicitud";
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private loginService: LoginService) { }

  private agregarAutorizacionHeader()
  {
    let token = this.loginService.token();
    if (token!=null){
      return this.httpHeaders.append('Authorization', 'Bearer '+token);
    }
    return this.httpHeaders;
  }
  private Autorizacion(e):boolean{
    if(e.status ==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }
  Listar(): Observable<SituacionResponse[]>{
    return this.http.get<SituacionResponse[]>( `${this.urlEndPoint}/listar`, {headers: this.agregarAutorizacionHeader()} ).pipe(
      catchError(e => {
        this.Autorizacion(e);
        alertifyjs
          .alert("Error Verifique.", "No esta autenticado.!!", function(){
          });
        return throwError(e);
      })
    );
  }
}
