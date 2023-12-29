import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TradelineModel} from '@service/models';
import {environment} from '@env/environment';
import {Injectable} from '@angular/core';

const API_CUSTOMERS_URL = environment.apiUrl + '/trade';

@Injectable({
    providedIn: 'root'
})
export class TradeService {
    constructor(private http: HttpClient) {
    }

    findCustTradelines(_appId: number): Observable<TradelineModel[]> {
        return this.http.get<TradelineModel[]>(API_CUSTOMERS_URL).pipe(
            map(trades => trades.filter(trade => trade.applicationId === _appId))
        );
    }

    upsertTradeLines(_tradeId: number): Observable<TradelineModel> {
        return this.http.get<TradelineModel>(API_CUSTOMERS_URL + `/${_tradeId}`);
    }

}
