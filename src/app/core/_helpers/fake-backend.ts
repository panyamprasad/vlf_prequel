/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: fake-backend.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const testUser = {id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'};

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    const body = {
                        id: testUser.id,
                        username: testUser.username,
                        firstName: testUser.firstName,
                        lastName: testUser.lastName,
                        token: 'fake-jwt-token'
                    };
                    return of(new HttpResponse({status: 200, body}));
                } else {
                    // else return 400 bad request
                    return throwError({error: {message: 'Username or password is incorrect'}});
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid,
                // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return of(new HttpResponse({status: 200, body: [testUser]}));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({error: {message: 'Unauthorised'}});
                }
            }

            // pass through any requests not handled above
            return next.handle(request);

        }))

        // call materialize and dematerialize to ensure delay even
        // if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
