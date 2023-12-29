import {Injectable, Injector} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Event, NavigationError, Router} from '@angular/router';
import * as StackTraceParser from 'error-stack-parser';
import {Observable, of} from 'rxjs';

import * as Sentry from '@sentry/browser';

Sentry.init({
    dsn: 'https://0b87bbb49e104f4896010df21848e71e@sentry.io/1315313'
});

@Injectable()
export class ErrorsService {

    constructor(
        private injector: Injector,
        private router: Router) {
        // Subscribe to the NavigationError
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationError) {
                // Redirect to the ErrorComponent
                this.log(event.error, null).subscribe((errorWithContext) => {
                    this.router.navigate(['/error'], {queryParams: errorWithContext});
                });
            }
        });
    }

    log(error, request) {
        const errorToSend = this.addContextInfo(error, request);
        return FakeHttpService.post(errorToSend);
    }

    addContextInfo(_error, _request) {
        // You can include context details here (usually coming from other services: UserService...)
        const name = _error.name || null;
        const appId = '';
        const user = 'ifs';
        const time = _error.timestamp;
        // const id = appId-user-time;
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const api = _error.path;
        const status = _error.status || null;
        const message = _error.message || _error.toString();
        const error = _error.error || '';
        const stack = _error instanceof HttpErrorResponse ? null : StackTraceParser.parse(_error);
        const request = JSON.stringify(_request);
        const errorWithContext = {name, appId, user, time, url, api, status, message, error, stack, request};
        return errorWithContext;
    }

}

class FakeHttpService {
    static post(error): Observable<any> {
        // Log the error to the console
        // Sentry.captureException(error.originalError || error);
        return of(error);
    }
}
