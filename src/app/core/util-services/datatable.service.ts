/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: datatable.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataTableItemModel} from '../creditsnap/models/datatable-item.model';

const API_DATATABLE_URL = 'api/cars';

@Injectable()
export class DataTableService {

    constructor(private http: HttpClient) {
    }

    getAllItems(): Observable<DataTableItemModel[]> {
        return this.http.get<DataTableItemModel[]>(API_DATATABLE_URL);
    }
}
