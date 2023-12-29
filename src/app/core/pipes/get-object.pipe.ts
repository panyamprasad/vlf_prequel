/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: get-object.pipe.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Pipe, PipeTransform} from '@angular/core';
import * as objectPath from 'object-path';

@Pipe({
    name: 'mGetObject'
})
export class GetObjectPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return objectPath.get(value, args);
    }
}
