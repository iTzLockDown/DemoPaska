import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {Observable, throwError} from 'rxjs';
import {AsesorResponse} from '../Models/Response/AsesorResponse';
import {catchError, map} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {OficinaResponse} from '../Models/Response/OficinaResponse';
import {AsesorRequest} from '../Models/Request/AsesorRequest';
@Injectable({
  providedIn: 'root'
})
export class AsesorService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/asesor";
  private colaUnica = "listarcolaunica";
  private colaMultiple = "listarcolamultiple";
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private loginService : LoginService) { }

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
  AsesoresColaUnica(): Observable<AsesorResponse[]> {

    return this.http.get(`${this.urlEndPoint}/${this.colaUnica}`, {headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as AsesorResponse[]),
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

  AsesoresColaMultiple():Observable<AsesorResponse[]>{

    return this.http.get(`${this.urlEndPoint}/${this.colaMultiple}`, {headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as AsesorResponse[]),
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

  AsignaAsesoresColaMultiple(asesorRequest: AsesorRequest):Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}/asignacolamultiple`, asesorRequest, {headers: this.agregarAutorizacionHeader()}).pipe(

      catchError(e => {
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

  AsignaAsesoresColaUnica(codigoAsesor: string):Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/eliminacolamultiple?codigoAsesor=${codigoAsesor}`,  {headers: this.agregarAutorizacionHeader()}).pipe(

      catchError(e => {
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

  OficinaAsesor(codigoAsesor: string):Observable<OficinaResponse[]>{
    return this.http.get(`http://200.60.61.250:8007/api/asesor/listaroficinaasesormultiple?codigoAsesor=${codigoAsesor}`, {headers: this.agregarAutorizacionHeader()}).pipe(

      map(response => response as OficinaResponse[]),
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
