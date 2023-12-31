import {Injectable} from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import * as _ from 'lodash';
import {QueryParamsModel} from '@service/models/query-models/query-params.model';
import {QueryResultsModel} from '@service/models/query-models/query-results.model';
import {environment} from '@env/environment';


@Injectable({
    providedIn: 'root'
})
export class HttpUtilsService {

    getFindHTTPParams(queryParams): HttpParams {
        const params = new HttpParams()
            .set('lastNamefilter', queryParams.filter)
            .set('sortOrder', queryParams.sortOrder)
            .set('sortField', queryParams.sortField)
            .set('pageNumber', queryParams.pageNumber.toString())
            .set('pageSize', queryParams.pageSize.toString());

        return params;
    }

    getHTTPHeaders(): HttpHeaders {
        const result = new HttpHeaders();
        result.set('Content-Type', 'application/json');
        return result;
    }

    getBasicAuthHeaders(): HttpHeaders {
        const result = new HttpHeaders();
        result.set('X-Skip-Interceptor', environment.auth.interceptorSkipHeader);
        return result;
    }

    baseFilter(_entities: any[], _queryParams: QueryParamsModel, _filtrationFields: string[] = []): QueryResultsModel {
        // Filtration
        let entitiesResult = this.searchInArray(_entities, _queryParams.filter, _filtrationFields);

        // Sorting
        // start
        if (_queryParams.sortField) {
            entitiesResult = this.sortArray(entitiesResult, _queryParams.sortField, _queryParams.sortOrder);
        }
        // end

        // Paginator
        // start
        const totalCount = entitiesResult.length;
        const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
        entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
        // end

        const queryResults = new QueryResultsModel();
        queryResults.items = entitiesResult;
        queryResults.totalCount = totalCount;
        return queryResults;
    }

    sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
        if (!_sortField) {
            return _incomingArray;
        }

        let result: any[] = [];
        result = _incomingArray.sort((a, b) => {
            if (a[_sortField] < b[_sortField]) {
                return _sortOrder === 'asc' ? -1 : 1;
            }

            if (a[_sortField] > b[_sortField]) {
                return _sortOrder === 'asc' ? 1 : -1;
            }

            return 0;
        });
        return result;
    }

    searchInArray(_incomingArray: any[], _queryObj: any, _filtrationFields: string[] = []): any[] {
        const result: any[] = [];
        let resultBuffer: any[] = [];
        const indexes: number[] = [];
        let firstIndexes: number[] = [];
        let doSearch: boolean = false;

        _filtrationFields.forEach(item => {
            if (item in _queryObj) {
                _incomingArray.forEach((element, index) => {
                    if (element[item] === _queryObj[item]) {
                        firstIndexes.push(index);
                    }
                });
                firstIndexes.forEach(element => {
                    resultBuffer.push(_incomingArray[element]);
                });
                _incomingArray = resultBuffer.slice(0);
                resultBuffer = [].slice(0);
                firstIndexes = [].slice(0);
            }
        });

        Object.keys(_queryObj).forEach(key => {
            const searchText = _queryObj[key].toString().trim().toLowerCase();
            if (key && !_.includes(_filtrationFields, key) && searchText) {
                doSearch = true;
                try {
                    _incomingArray.forEach((element, index) => {
                        if (!(typeof element[key] === 'undefined')) {
                            const _val = element[key].toString().trim().toLowerCase();
                            if (_val.indexOf(searchText) > -1 && indexes.indexOf(index) === -1) {
                                indexes.push(index);
                            }
                        }
                    });
                } catch (ex) {
                    console.log(ex, key, searchText);
                }
            }
        });

        if (!doSearch) {
            return _incomingArray;
        }

        indexes.forEach(re => {
            result.push(_incomingArray[re]);
        });

        return result;
    }
}
