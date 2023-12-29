/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: join.pipe.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mJoin'
})
export class JoinPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        if (Array.isArray(value)) {
            return value.join(' ');
        }
        return value;
    }
}
