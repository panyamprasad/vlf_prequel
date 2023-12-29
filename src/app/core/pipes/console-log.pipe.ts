/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: console-log.pipe.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mConsoleLog'
})
export class ConsoleLogPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return console.log(value);
    }
}
