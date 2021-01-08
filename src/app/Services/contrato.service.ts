import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {ClasificacionContratoResponse} from '../Models/Response/ClasificacionContratoResponse';
import {catchError, map} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {ModeloContratoResponse} from '../Models/Response/ModeloContratoResponse';
import {ModeloContratoRequest} from '../Models/Request/ModeloContratoRequest';
@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private urlEndPoint: string = "http://200.60.61.250:8007/api/modelocontrato";
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

  Lista(): Observable<ModeloContratoResponse[]> {

    return this.http.get(`${this.urlEndPoint}/lista`, {headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as ModeloContratoResponse[]),
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

  Busca(nombreBusqueda: string): Observable<ModeloContratoResponse[]> {

    return this.http.get(`${this.urlEndPoint}/buscar?variableBusqueda=${nombreBusqueda}`, {headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as ModeloContratoResponse[]),
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

  Grabar(oModeloContrato: ModeloContratoRequest): Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/grabar`, oModeloContrato, {headers: this.agregarAutorizacionHeader()})
      .pipe(      catchError(e => {
          if(this.Autorizacion(e)){
            return throwError(e);
          }
          if (e.status == 400) {
            console.log(e);
            return throwError(e);
          }
          return throwError(e);
        })
      );

  }
  Actualizar(oModeloContrato: ModeloContratoRequest): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/actualizar`, oModeloContrato, {headers: this.agregarAutorizacionHeader()})
      .pipe(      catchError(e => {
          if(this.Autorizacion(e)){
            return throwError(e);
          }
          if (e.status == 400) {
            console.log(e);
            return throwError(e);
          }
          return throwError(e);
        })
      );

  }

}
