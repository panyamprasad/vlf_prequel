/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: vehicle-db.util.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/**
 * Get Vehicle description from the external database
 */
@Injectable({
    providedIn: 'root',
})
export class VehicleDbUtilService {

    baseUrl: string = 'https://www.carqueryapi.com/api/0.3/';
    soldInUs: string = 'cq-sold-in-us';

    constructor(private http: HttpClient) {
    }

    // Get Car Model JSON for the selected make
    /* populateModelList( _makeId: string): Observable<any> {
         const subscription = this.http.post(this.baseUrl,
             {
                 'cmd': 'getModels',
                 'make': _makeId,
                 'sold_in_us': this.soldInUs
             })
             .subscribe(
                 data => {
                     // const models = data.Models;
                     const _oModels: any = [];
                     _oModels.forEach(function(obj) {
                         _oModels.push({viewValue: obj.model_name, value: obj.model_make_id});
                     });
                     console.log('PopulateModelList successful ', data);
                     return _oModels;
                 },
                 error => {
                     console.log('Error', error);
                 }
             );
         return forkJoin(subscription);
     }

     // Get Car Model JSON for the selected make
     populateMakeList( _year: string): Observable<any> {
         const subscription = this.http.post(this.baseUrl,
             {
                 'cmd': 'getMakes',
                 'year': _year,
                 'sold_in_us': this.soldInUs
             })
             .subscribe(
                 data => {
                     const makes = data.Makes;
                     const _oMakes: any = [];
                     makes.forEach(function(obj) {
                         _oMakes.push({viewValue: obj.make_display, value: obj.make_id});
                     });
                     console.log('PopulateModelList successful ', data);
                     return _oMakes;
                 },
                 error => {
                     console.log('Error', error);
                 }
             );
         return subscription;
     }
     // Get Car Model JSON for the selected make
     populateTrimList( _makeId: string, _modelName: string): Observable<any> {
         const subscription = this.http.post(this.baseUrl,
             {
                 'cmd': 'getTrims',
                 'year': -1,
                 'make': _makeId,
                 'model': _modelName,
                 'sold_in_us': this.soldInUs
             })
             .subscribe(
                 data => {
                     const makes = data.Trims;
                     const _oMakes: any = [];
                     makes.forEach(function(obj) {
                         _oMakes.push({viewValue: obj.model_year + ' ' + obj.model_name + ' ' + obj.model_trim, value: obj.model_id});
                     });
                     console.log('PopulateModelList successful ', data);
                     return _oMakes;
                 },
                 error => {
                     console.log('Error', error);
                 }
             );
         return subscription;
     }*/
}
