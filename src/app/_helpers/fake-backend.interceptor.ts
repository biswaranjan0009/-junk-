import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { User } from '../_models/user';

const users: User[] = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }
]

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null).
            pipe(mergeMap(handleRoute)).
            pipe(materialize()).
            pipe(delay(500)).
            pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/user/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(user => user.username === username && user.password === password);

            if (!user) {
                return sendError('Invalid credentials!');
            }

            return sendResponse({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token'
        }

        function sendResponse(body?: any) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function sendError(message: any) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function getUsers() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            return sendResponse(users);
        }

    }
}

export let fakeBackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}