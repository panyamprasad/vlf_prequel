import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retry} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ContactHistoryModel, CSPostResponseModel} from '@service/models';

const API_CONTACT_URL = environment.apiUrl + '/contact';

@Injectable({
    providedIn: 'root'
})
export class ContactHistoryService {
    constructor(private http: HttpClient) {
    }

    addConatctHistory(applicationId: number, contact: ContactHistoryModel): Observable<CSPostResponseModel> {
        return this.http.post<CSPostResponseModel>(API_CONTACT_URL + `/${applicationId}`, contact).pipe(
            retry(3));
    }

    getContactHistory(_applicationId: number): Observable<ContactHistoryModel[]> {
        console.log(' offer findOfferByApplicationId => ', _applicationId);
        return this.http.get<ContactHistoryModel[]>(API_CONTACT_URL + `/${_applicationId}`).pipe(
            retry(3));
    }
}
