import {Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginService} from '../Services/login.service';
import {Router} from '@angular/router';
import alertifyjs from 'AlertifyJS';

import {catchError} from 'rxjs/operators';
@Injectable()
export class AutentificacionInterceptor  implements HttpInterceptor{
  constructor(private loginService: LoginService,
              private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if(e.status ==401 ){
          this.router.navigate(['/login']);
        }
        if(e.status==403){
          this.router.navigate(['/dashboard']);
        }
        return throwError(e)
      })
      );
  }
}
