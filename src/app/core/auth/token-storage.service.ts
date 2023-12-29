import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LoginUserModel} from '@service/models';

@Injectable()
export class TokenStorage {
    /**
     * Get access token
     * @returns {Observable<string>}
     */
    public getAccessToken(): Observable<string> {
        const token: string = <string>localStorage.getItem('accessToken');
        return of(token);
    }

    public getToken(): string {
        return localStorage.getItem('accessToken');
    }

    /**
     * Get refresh token
     * @returns {Observable<string>}
     */
    public getRefreshToken(): Observable<string> {
        const token: string = <string>localStorage.getItem('refreshToken');
        console.log('refresh token from storage =>', JSON.stringify(token));
        return of(token);
    }

    /**
     * Get user roles in JSON string
     * @returns {Observable<any>}
     */
    public getUserRoles(): Observable<any> {
        const roles: any = localStorage.getItem('userRoles');
        try {
            return of(JSON.parse(roles));
        } catch (e) {
        }
    }

    public getApplications(): any {
        const csboApps: any = localStorage.getItem('csboApps');
        try {
            return JSON.parse(csboApps);
        } catch (e) {
            return null;
        }
    }

    public getLoginUserModel(): LoginUserModel {
        const loginUser: any = localStorage.getItem('loginUser');
        try {
            return JSON.parse(loginUser);
        } catch (e) {
            throw (e);
        }
    }

    /**
     * Set access token
     * @returns {TokenStorage}
     */
    public setAccessToken(token: string): TokenStorage {
        localStorage.setItem('accessToken', token);
        return this;
    }

    /**
     * Set refresh token
     * @returns {TokenStorage}
     */
    public setRefreshToken(token: string): TokenStorage {
        localStorage.setItem('refreshToken', token);
        return this;
    }

    /**
     * Set user roles
     * @param roles
     * @returns {TokenStorage}
     */
    public setUserRoles(roles: any): any {
        if (roles != null) {
            localStorage.setItem('userRoles', JSON.stringify(roles));
        }
        return this;
    }

    public setApplications(apps: any) {
        if (apps !== null) {
            localStorage.setItem('csboApps', JSON.stringify(apps));
        }
    }

    /**
     * Remove tokens
     */
    public clear() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRoles');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('csboApps');
    }

    public clearCSBOApps() {
        localStorage.removeItem('csboApps');
    }

    /**
     * Set Expires In
     * @returns {TokenStorage}
     */
    public setExpiresIn(token: string): TokenStorage {
        localStorage.setItem('expiresIn', token);
        return this;
    }

    /**
     * set Token token
     * @returns {Observable<string>}
     */
    public setScopeToken(token: string): TokenStorage {
        localStorage.setItem('scope', token);
        return this;
    }

    public setLoginUserModel(loginUser: LoginUserModel): TokenStorage {
        localStorage.setItem('loginUser', JSON.stringify(loginUser));
        return this;
    }

    public setAuthenticated(token: string): TokenStorage {
        localStorage.setItem('authenticated', token);
        return this;
    }

    /**
     * Set refresh token
     * @returns {TokenStorage}
     */
    public setExpiresToken(token: string): TokenStorage {
        localStorage.setItem('expires', token);

        return this;
    }

}
