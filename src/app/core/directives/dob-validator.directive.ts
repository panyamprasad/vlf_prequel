/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: dob-mask.directive.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import * as moment from 'moment';

@Directive({
    selector: '[dob-validator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS, useExisting: forwardRef(() => DOBValidatorDirective),
            multi: true
        }
    ]
})
export class DOBValidatorDirective implements Validator {
    //constructor( @Attribute('dob-validator') public validateEqual: string) {}


    validate(control: AbstractControl): ValidationErrors {
        const dob = control.value;
        const today = moment().startOf('day');
        const delta = today.diff(dob, 'years', false);
        console.log(' DOBValidatorDirective => ', dob, today, delta);
        if (delta <= 18 || delta > 70) {
            return {
                validateAdult: {
                    'requiredAge': '18+',
                    'currentAge': delta
                }
            };
        }
        return null;
    }

    /* static isValidDate(MM: any, DD: any, YYYY: any): boolean {
         if (MM < 1 || MM > 12) {
             return false;
         }
         let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];​
         // Adjust for leap years
         if (YYYY % 400 === 0 || (YYYY % 100 !== 0 && YYYY % 4 === 0)) {
             monthLength[1] = 29;
         }
         // Check the range of the day
         if (DD <= 0 || DD > monthLength[MM - 1]) {
             return false;
         }
         return true;
     }*/
}
