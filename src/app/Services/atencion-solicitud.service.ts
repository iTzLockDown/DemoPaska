import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {ModeloContratoResponse} from '../Models/Response/ModeloContratoResponse';
import {catchError, map} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {AtencionSolicitudResponse} from '../Models/Response/AtencionSolicitudResponse';
import {AtencionSolicitudRequest} from '../Models/Request/AtencionSolicitudRequest';
@Injectable({
  providedIn: 'root'
})
export class AtencionSolicitudService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/solicitudcredito";
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

  Lista(codigoAsesor:string): Observable<AtencionSolicitudResponse[]> {

    return this.http.get(`${this.urlEndPoint}/lista?codigoAsesor=${codigoAsesor}`,{headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as AtencionSolicitudResponse[]),
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
  TraerUno(codigoSolicitud:string): Observable<AtencionSolicitudResponse>{
    return this.http.get(`${this.urlEndPoint}/traeruno?codigoSolicitud=${codigoSolicitud}`, {headers:this.agregarAutorizacionHeader()})
      .pipe(
        map(response => response as AtencionSolicitudResponse),
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
  Grabar(atencionSolicitud: AtencionSolicitudRequest): Observable<any>{
    console.log(atencionSolicitud);
    return this.http.post<any>(`http://200.60.61.250:8007/api/solicitudcredito/grabar`, atencionSolicitud, {headers: this.agregarAutorizacionHeader()})
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
