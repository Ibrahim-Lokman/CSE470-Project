import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private login:LoginService){

    }
    
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
        ): Observable<HttpEvent<any>> {

            const token = this.login.getToken();
            let authReq = req;
            if (token != null) {
                authReq = authReq.clone({
                setHeaders: {Authorization : `Bearer ${token}`},
                });

        }
        return next.handle(authReq);
    }
}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
];