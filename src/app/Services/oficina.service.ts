import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {AsesorResponse} from '../Models/Response/AsesorResponse';
import {OficinaResponse} from '../Models/Response/OficinaResponse';
import {catchError, map} from 'rxjs/operators';
import alertifyjs from 'AlertifyJS';
import {AsesorRequest} from '../Models/Request/AsesorRequest';
@Injectable({
  providedIn: 'root'
})
export class OficinaService {

  private urlEndPoint: string = "http://200.60.61.250:8007/api/oficinacola";
  private oficinaColaUnica = 'colaunica';
  private oficinaColaMultiple = 'colamultiple';
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

  OficinaColaUnica(): Observable<OficinaResponse[]> {
    return this.http.get<OficinaResponse[]>(`http://200.60.61.250:8007/api/oficinacola/colaunica`,{headers: this.agregarAutorizacionHeader()}).pipe(
      catchError(e => {
        this.Autorizacion(e);
        alertifyjs
          .alert("Error Verifique.", "No esta autenticado.!!", function(){
          });
        return throwError(e);
      })
    );
  }

  AsignaOficinaAsesor(asesorRequest: AsesorRequest): Observable<any> {

    return this.http.post<any>(`http://200.60.61.250:8007/api/oficinacola/asignacolamultiple`, asesorRequest,{headers: this.agregarAutorizacionHeader()}).pipe(
      catchError(e => {
        this.Autorizacion(e);
        alertifyjs
          .alert("Error Verifique.", "No esta autenticado.!!", function(){
          });
        return throwError(e);
      })
    );
  }

  EliminaOficinaAsesor(codigoOficina: string): Observable<any> {

    return this.http.get<any>(`http://200.60.61.250:8007/api/oficinacola/eliminacolamultiple?codigoOficina=${codigoOficina}`, {headers: this.agregarAutorizacionHeader()}).pipe(
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
