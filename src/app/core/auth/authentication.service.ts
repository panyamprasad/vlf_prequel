import {from, Observable, of, Subject, throwError} from 'rxjs';
import {catchError, map, share, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthService} from 'ngx-auth';
import {TokenStorage} from './token-storage.service';
import {AuthToken} from './auth.token';
import {Credential} from './credential';
import {environment} from '@env/environment';
import {UtilsService} from '@core/util-services/utils.service';
import {LoginUserModel} from '@service/models';

const API_EMPLOYEE_URL = environment.apiUrl + '/employee';
const API_OAUTH_URL = environment.apiUrl + '/oauth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService implements AuthService {
    API_URL = 'api';
    API_ENDPOINT_LOGIN = '/login';
    API_ENDPOINT_REFRESH = '/refresh';
    API_ENDPOINT_TOKEN = '/token';
    API_ENDPOINT_REGISTER = '/register';
    public token: AuthToken;
    public onCredentialUpdated$: Subject<AuthToken>;
    public onLoginUserDetailsUpdated: Subject<LoginUserModel>;
    userProfile: LoginUserModel;

    constructor(
        private http: HttpClient,
        private tokenStorage: TokenStorage,
        private util: UtilsService) {
        this.onCredentialUpdated$ = new Subject();
        this.onLoginUserDetailsUpdated = new Subject();
        this.userProfile = new LoginUserModel();
        this.onCredentialUpdated$.subscribe(value => {
            this.token = value;
        });
        this.onLoginUserDetailsUpdated.subscribe(value => {
            this.userProfile = value;
            this.tokenStorage.setLoginUserModel(this.userProfile);
        });
    }

    public getUserProfile(): LoginUserModel {
        try {
            return this.tokenStorage.getLoginUserModel();
        } catch (e) {
            this.logout(true);
        }
    }

    public getUserEmployeeId() {
        const profile = this.getUserProfile();
        if (profile === undefined || profile === null) {
            this.logout(true);
            return '';
        }
        return profile.employeeID ? profile.employeeID : '';
    }

    /**
     * Check, if user already authorized.
     * @description Should return Observable with true or false values
     * @returns {Observable<boolean>}
     * @memberOf AuthService
     */
    public isAuthorized(): Observable<boolean> {
        return this.tokenStorage.getAccessToken().pipe(map(token => !!token));
    }

    public isAuthenticated(): boolean {
        if (this.token === undefined || this.token === null) {
            return false;
        }
        return this.token.authenticated;
    }

    refreshToken(): Observable<string> {
        // append refresh token if you have one
        const refreshToken = localStorage.getItem('refreshToken');
        const expiredToken = localStorage.getItem('token');
        const model = {grant_type: 'refresh_token', refresh_token: refreshToken};
        console.log('Refresh token is called => ', JSON.stringify(model));
        return this.http.post<AuthToken>(API_OAUTH_URL + this.API_ENDPOINT_TOKEN + '?' + this.util.urlParam(model),
            null, {
                headers: new HttpHeaders()
                    .set('X-Skip-Interceptor', environment.auth.interceptorSkipHeader), observe: 'response'
            })
            .pipe(share(),
                // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
                map(res => {
                    console.log('authentication service =>', res);
                    console.log('timeout refreshToken map response=> ', (new Date()).getUTCMilliseconds());
                    this.saveAccessData(res.body);
                    return res.body['access_token'];
                }),
                catchError(err => {
                    console.log('timeout refreshToken catchError => ', (new Date()).getUTCMilliseconds());
                    return throwError(err);
                })
            );
    }

    getToken(): Observable<string> {
        const token = this.tokenStorage.getToken();
        // const isTokenExpired = this.decoder.isTokenExpired(token);

        if (!this.isTokenExpired()) {
            return of(token);
        }
        //return this.refreshToken();
    }

    /**
     * Get access token
     * @description Should return access token in Observable from e.g. localStorage
     * @returns {Observable<string>}
     */
    public getAccessToken(): Observable<string> {
        return this.tokenStorage.getAccessToken();
    }

    /**
     * Get user roles
     * @returns {Observable<any>}
     */
    public getUserRoles(): Observable<any> {
        return this.tokenStorage.getUserRoles();
    }

    /**
     * Function, that should perform refresh token verifyTokenRequest
     * @description Should be successfully completed so interceptor
     * can execute pending requests or retry original one
     * @returns {Observable<any>}

     public refreshToken(): Observable<AuthToken> {
		return this.tokenStorage.getRefreshToken().pipe(
			switchMap((refreshToken: string) => {
                const model = {grant_type: 'refresh_token', refresh_token: refreshToken};
                console.log('Refresh token is called => ', JSON.stringify(model));
                return this.http.post<AuthToken>(API_OAUTH_URL + this.API_ENDPOINT_TOKEN + '?' + this.util.urlParam(model),
                    null, {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}});
			}),
			tap(this.saveAccessData.bind(this)),
			catchError(err => {
				this.logout();
				return throwError(err);
			})
		);
	}
     */
    /**
     * Submit login request
     * @returns {Observable<any>}
     */
    public authenticate(credential: Credential): Observable<any> {
        // Expecting response from API
        // {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"a
        //      * @param {Credential} credentialccess-token-0.022563452858263444",
        // "refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/app/media/img/users/user4.jpg",
        // "fullname":"Mark Andre"}
        return this.http.post<AuthToken>(API_OAUTH_URL + this.API_ENDPOINT_TOKEN + '?' + this.util.urlParam(credential),
            {}, {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}}).pipe(
            map((result: any) => {
                // result['roles'] = [].push(result['role']);
                result['roles'] = ['ADMIN', 'PARTY_USER', 'ROLE_PARTY_USER'];
                // console.log ('authenticate =>', result);
                if (result instanceof Array) {
                    return result.pop();
                }
                return result;
            }),
            tap(this.saveAccessData.bind(this)),
            catchError(err => {
                console.log('authetication err => ', err);
                return throwError(err);
            })
        );
    }

    /**
     * Function, checks response of failed request to determine,
     * whether token be refreshed or not.
     * @description Essentialy checks status
     * @param {Response} response
     * @returns {boolean}
     */
    public refreshShouldHappen(response: HttpErrorResponse): boolean {
        return response.status === 401 && this.isAuthenticated();
    }

    /**
     * Verify that outgoing request is refresh-token,
     * so interceptor won't intercept this request
     * @param {string} url
     * @returns {boolean}
     */
    public verifyTokenRequest(url: string): boolean {
        return url.endsWith(this.API_ENDPOINT_REFRESH);
    }

    /**
     * Submit login request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    public login(credential: Credential): Observable<any> {
        // Expecting response from API
        // {"id":1,"username":"admin","password":"demo","email":"admin@demo.com",
        // "accessToken":"access-token-0.022563452858263444","refreshToken":"access-token-0.9348573301432961",
        // "roles":["ADMIN"],"pic":"./assets/app/media/img/users/user4.jpg","fullname":"Mark Andre"}
        return this.http.post<AuthToken>(API_OAUTH_URL + this.API_ENDPOINT_TOKEN + '?' + this.util.urlParam(credential), {},
            {headers: {'X-Skip-Interceptor': environment.auth.interceptorSkipHeader}}).pipe(
            map((result: any) => {
                result['roles'] = ['ADMIN', 'PARTY_USER', 'ROLE_PARTY_USER'];
                //  console.log ('authenticate login =>', result);
                if (result instanceof Array) {
                    return result.pop();
                }
                this.onLoginUserDetailsUpdated.next(result);
                return result;
            }),
            tap(this.saveAccessData.bind(this)),
            catchError(err => {
                return throwError(err);
            })
        );
    }

    /**
     * Logout
     */
    public logout(refresh?: boolean): void {
        this.tokenStorage.clear();
        if (refresh) {
            location.reload(true);
        }
    }

    /**
     * Submit registration request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    public register(credential: Credential): Observable<any> {
        // dummy token creation
        credential = Object.assign({}, credential, {
            accessToken: 'access-token-' + Math.random(),
            refreshToken: 'access-token-' + Math.random(),
            roles: ['USER'],
        });
        return this.http.post(this.API_URL + this.API_ENDPOINT_REGISTER, credential)
            .pipe(catchError(this.handleError('register', [])));
    }

    public isTokenExpired(): boolean {
        if (this.token === undefined || this.token === null) {
            return true;
        }
        return !(this.token.authenticated && new Date() <= this.token.expires);
    }

    /**
     * Submit forgot password request
     * @param {Credential} credential
     * @returns {Observable<any>}
     */
    public requestPassword(credential: Credential): Observable<any> {
        return this.http.get(this.API_URL + this.API_ENDPOINT_LOGIN + '?' + this.util.urlParam(credential))
            .pipe(catchError(this.handleError('forgot-password', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: any) {
        return (error: any): Observable<any> => {
            // TODO - Long term: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // Let the app keep running by returning an empty result.
            return from(result);
        };
    }

    /**
     * Save access data in the storage
     * @private
     * @param {AuthToken} data
     */
    private saveAccessData(accessData: AuthToken) {
        if (typeof accessData !== 'undefined') {
            accessData.authenticated = true;
            accessData.expires = new Date(new Date().setMilliseconds(0) + ((accessData.expires_in - 1) * 1000));
            this.tokenStorage
                .setAccessToken(accessData.accessToken)
                .setRefreshToken(accessData.refreshToken)
                .setUserRoles(accessData.roles)
                .setAccessToken(accessData.access_token)
                .setRefreshToken(accessData.refresh_token)
                .setExpiresIn(accessData.expires_in.toString())
                .setScopeToken(accessData.scope)
                .setAuthenticated('true')
                .setExpiresToken(accessData.expires.toDateString());
            this.onCredentialUpdated$.next(accessData);
        }
    }

}
