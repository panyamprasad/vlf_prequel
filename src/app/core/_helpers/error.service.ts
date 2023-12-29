import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    errorMessage: string = '';
    httpCode: number;
    request: any;

    constructor() {
    }
}
