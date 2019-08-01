import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticateService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('ErrorInterceptor');

        return next.handle(request).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.authenticateService.logout();
                    location.reload(true);
                }

                const errorMessage = error.error.message || error.statusText;
                return throwError(errorMessage);
            })
        );
    }
}