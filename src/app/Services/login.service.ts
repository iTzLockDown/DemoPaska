import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../Models/login';
import {User} from '../Models/user';
import {_Login} from '../Util/RoutesAPI';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public _token : string;
  constructor(private http: HttpClient) { }

  login(usuario: Login): Observable<User> {
    const urslEndPoint = _Login.Token;
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let params = new URLSearchParams();
    params.set('Usuario', usuario.Usuario);
    params.set('Contraseña', usuario.Contrasenia);
    return this.http.post<User>(urslEndPoint, params.toString(), {headers: httpHeaders});
  }

  public token(): string{
    if (this._token != null){
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

   Autenticado(): boolean{
    let payload = this.token();
      if(payload != null) {
        return true;
      }
    return false;
   }
}
