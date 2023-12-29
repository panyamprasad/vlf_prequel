import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {AuthenticationService} from '@core/auth/authentication.service';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    inflightAuthRequest = null;
    blacklist: object = [
        /(((https?):\/\/|www\.)theinfogrid.com\/auth\/)/,
        'wordpress',
        'some-other-pattern'
    ];

    constructor(
        private injector: Injector,
        private authService: AuthenticationService,
        private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // exempt some paths from authentication
        // Skip request to add the Oauth token
        // Create Application / short-app and /search with basic auth
        let newHeaders = new HttpHeaders();
        newHeaders = newHeaders.append('Accept', 'application/json');
        newHeaders = newHeaders.append('Channel', environment.channel);
        newHeaders = newHeaders.append('Content-Type', 'application/json; charset=utf-8');
        newHeaders = newHeaders.append('Access-Control-Allow-Origin', '*');
        newHeaders = newHeaders.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        newHeaders = newHeaders.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

       
       
        newHeaders = newHeaders.append('Institution-Id', environment.institutionId);
        let basicAuthRequest = request.clone({headers: newHeaders});
        const hasSkipOAuth: boolean = request.headers.has(environment.auth.interceptorSkipHeader);
        if (hasSkipOAuth) {
            const isProspect: boolean = request.headers.has('Is-Prospect');
            if (isProspect) {
                newHeaders = newHeaders.append('Is-Prospect', 'Y');
            }
            basicAuthRequest = request.clone({headers: newHeaders});
            return next.handle(basicAuthRequest.clone({
                headers: basicAuthRequest.headers.set('Authorization', environment.auth.basic)
            }));
        }
        // let headers = request.headers.delete(environment.auth.interceptorSkipHeader);
        if (!this.inflightAuthRequest) {
            this.inflightAuthRequest = this.authService.getToken();
        }
        return next.handle(basicAuthRequest.clone({
            //headers: basicAuthRequest.headers.append('Authorization', `Bearer ${token}`)
        }));
        // const originalRequest = request.clone({headers: newHeaders});
       /*  return this.inflightAuthRequest.pipe(
            switchMap((newToken: string) => {
                // unset request inflight
                this.inflightAuthRequest = null;
                console.log('timeout 1st resturn this.inflightAuthRequest.pipe newToken => ',
                    (new Date()).getUTCMilliseconds(), newToken);
                const token = newToken ? newToken : '';
                return next.handle(basicAuthRequest.clone({
                    headers: basicAuthRequest.headers.append('Authorization', `Bearer ${token}`)
                }));
            }),
            catchError(error => {
                // checks if a url is to an admin api or not
                const appError = error.error || null;
                let invalid_grant = false;
                if (appError && appError.error) {
                    invalid_grant = !!appError.error.match(/invalid_grant/g);
                }
                // HTTP status code is 400 but application errr.code is > 0 then, this is a expected result
                if (error.status === 400 && appError && appError.code > 0) {
                    return throwError(error.error);
                } else if (error.status === 400 && invalid_grant) {
                    // HTTP status code is 400 but invalid grant error then force to relogin
                    //  console.log('timeout catchError 400 => ', (new Date()).getUTCMilliseconds(), error);
                    this.authService.logout(true);
                    this.router.navigate(['/login']);
                    return throwError(error);
                } else if (error.status === 401 || error.status === 0) {
                    // HTTP status code is 401 unauthorized, may be unable to renew refresh token
                    // check if the response is from the token refresh end point
                    const isRefreshTokenExpired = !!appError.error_description.match(/expired/g) &&
                        !!appError.error_description.match(/invalid_token/g);
                    // console.log('timeout catchError 401 => ', (new Date()).getUTCMilliseconds(), error, isRefreshTokenExpired);
                    // || !!appError.error_description.match(/Login User Not Found/g);
                    if (isRefreshTokenExpired) {
                        this.authService.logout(true);
                        this.router.navigate(['/login']);
                        return throwError(error);
                    } else if (!this.inflightAuthRequest) {
                        this.inflightAuthRequest = this.authService.refreshToken();
                        if (!this.inflightAuthRequest) {
                            // remove existing tokens
                            // console.log('timeout catchError  inflightAuthRequest if redirect to login => ',
                            //    (new Date()).getUTCMilliseconds(), this.inflightAuthRequest);
                            this.authService.logout(true);
                            this.router.navigate(['/login']);
                            return throwError(error);
                        }
                    }
                    return this.inflightAuthRequest.pipe(
                        switchMap((newToken: string) => {
                            // unset inflight request
                            this.inflightAuthRequest = null;
                            return next.handle(basicAuthRequest.clone({
                                headers: basicAuthRequest.headers.set('Authorization', `Bearer ${newToken}`)
                            }));
                        })
                    );
                } else if (error.status === 419) {
                    return this.authService.refreshToken().subscribe(token => {
                        // console.log('timeout 2nd inflightAuthRequest 419 => ', (new Date()).getUTCMilliseconds(), token);
                        return next.handle(basicAuthRequest.clone({
                            headers: basicAuthRequest.headers.set('Authorization', `Bearer ${token}`)
                        }));
                    });

                } else {
                    // console.log('timeout catch last else => ', (new Date()).getUTCMilliseconds(), error);
                    return throwError(error);
                }
            }) as any
        ); */
    }

    blacklistCheckup($url: string): boolean {
        let returnValue = false;
        for (const i of Object.keys(this.blacklist)) {
            if (this.blacklist[i].exec($url) !== null) {
                returnValue = true;
                break;
            }
        }
        return returnValue;
    }
}
