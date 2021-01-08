import {Injectable} from '@angular/core';
import {Usuario} from '../Models//usuario';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AsesorResponse} from '../Models/Response/AsesorResponse';
import {LoginService} from './login.service';
import alertifyjs from 'AlertifyJS';
@Injectable()
export class UsuarioService {
  private urlEndPoint: string = "http://200.60.61.250:8007//api/asesor/listarcolaunica";
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router,
              private loginService : LoginService) {
  }

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




  getUsuarios(): Observable<AsesorResponse[]> {

    return this.http.get(this.urlEndPoint, {headers: this.agregarAutorizacionHeader()}).pipe(

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

  create(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, usuario, {headers: this.agregarAutorizacionHeader()}).pipe(
      catchError(e => {
        if(this.Autorizacion(e)){
          return throwError(e);
        }
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getUsuario(id): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/usuarios']);
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.cCodigoUsu}`, usuario, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
