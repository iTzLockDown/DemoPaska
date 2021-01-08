import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {Observable, throwError} from 'rxjs';
import {TipoSolicitudRequest} from '../Models/Request/TipoSolicitudRequest';
import {catchError} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudRequisitoService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/tiposolicitudrequisito";
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
  Listar(codigoTipoSolicitud:bigint): Observable<TipoSolicitudRequest[]>{
    return this.http.get<TipoSolicitudRequest[]>( `${this.urlEndPoint}/listar?codigoTipoSolicitud=${codigoTipoSolicitud}`, {headers: this.agregarAutorizacionHeader()} ).pipe(
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
