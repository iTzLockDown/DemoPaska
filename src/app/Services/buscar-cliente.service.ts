import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {ClasificacionContratoResponse} from '../Models/Response/ClasificacionContratoResponse';
import {Observable, throwError} from 'rxjs';
import {CriterioBusquedaRequest} from '../Models/Request/CriterioBusquedaRequest';
import {ClienteResponse} from '../Models/Response/ClienteResponse';
import alertifyjs from 'AlertifyJS';
import {CreditoClienteResponse} from '../Models/Response/CreditoClienteResponse';
@Injectable({
  providedIn: 'root'
})
export class BuscarClienteService {
  private urlEndPoint: string = "http://200.60.61.250:8007/api/busquedacliente";
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
  BuscarCliente(criterioBusqueda: CriterioBusquedaRequest): Observable<ClienteResponse[]>{

    return this.http.post(`${this.urlEndPoint}/listarbusqueda`,criterioBusqueda ,{headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as ClienteResponse[]),
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
  BuscaCredito(codigoCliente: string): Observable<CreditoClienteResponse[]>
  {
      return this.http.get<CreditoClienteResponse[]>(`${this.urlEndPoint}/listarbusquedacredito?codigoCliente=${codigoCliente}`, {headers: this.agregarAutorizacionHeader()})
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
