import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {AccionSolicitud} from '../Models/Request/AccionSolicitud';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AtencionSolicitudResponse} from '../Models/Response/AtencionSolicitudResponse';
import alertifyjs from 'AlertifyJS';
import {AccionSolicitudResponse} from '../Models/Response/AccionSolicitudResponse';
@Injectable({
  providedIn: 'root'
})
export class EstadoProcesoSolicitudService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/estadoprocesosolicitud";
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router) { }

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

  Iniciar(accionSolicitud: AccionSolicitud):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/iniciar`, accionSolicitud, {headers: this.agregarAutorizacionHeader()})
      .pipe(

        catchError(e => {
          this.Autorizacion(e);
          alertifyjs
            .alert("Error Verifique.", "No esta autenticado.!!", function(){
              alertifyjs.error('Ingrese sus credenciales!!');
            });
          return throwError(e);
        })

      );

  }
  Finalizar(accionSolicitud :AccionSolicitud):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/finalizar`, accionSolicitud, {headers: this.agregarAutorizacionHeader()})
      .pipe(
        catchError(e => {
          this.Autorizacion(e);
          alertifyjs
            .alert("Error Verifique.", "No esta autenticado.!!", function(){
              alertifyjs.error('Ingrese sus credenciales!!');
            });
          return throwError(e);
        })
      );
  }
  Listar(codigoSolicitud: string):Observable<AccionSolicitudResponse[]>{
    return this.http.get<AccionSolicitudResponse[]>(`${this.urlEndPoint}/listar?codigosolicitud=${codigoSolicitud}`, {headers: this.agregarAutorizacionHeader()})
      .pipe(
        catchError(e => {
          this.Autorizacion(e);
          alertifyjs
            .alert("Error Verifique.", "No esta autenticado.!!", function(){
              alertifyjs.error('Ingrese sus credenciales!!');
            });
          return throwError(e);
        })
      );
  }

}
