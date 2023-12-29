// Samplce access data
// {"id":1,"username":"admin","password":"demo","email":"admin@demo.com","accessToken":"access-token-0.022563452858263444",
// "refreshToken":"access-token-0.9348573301432961","roles":["ADMIN"],"pic":"./assets/app/media/img/users/.jpg","fullname":"Mark Andre"}
export class AuthToken {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    expires: Date;
    authenticated: boolean = false;
    name: string;
    avatar: string;
    roles: any;
    error: string; // "unauthorized",
    error_description: string; // "Accessing the loan application with invalid details."
    access_token: string;
    token_type: string; // "bearer",
    refresh_token: string; // "2d9fbd3a-be1a-4316-9812-d94a3b96df78",
    expires_in: number; // secconds 599,
    scope: string; // "read write trust"

    constructor(accessToken: string, refreshToken: string, tokenType: string, expiresIn: number) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
        // Store a time at which we should renew the token, subtract off one second to give us some buffer of time
        this.expires = new Date(new Date().setMilliseconds(0) + ((expiresIn - 1) * 1000));
    }

    static isValid(token: AuthToken): boolean {
        return token && new Date() <= new Date(token.expires);
    }
}
