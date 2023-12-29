/*******************************************************************************
 * Copyright (c) 2018 by CreditSnap Inc.  All Rights Reserved.
 * This code or any portion thereof may not be reproduced or used in any manner
 * whatsoever without the express written permission of the CreditSnap Inc.
 *
 * Author: sreeram
 * FileName: types-utils.service.ts
 * Date: 11/8/18 1:06 PM
 ******************************************************************************/

import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class TypesUtilsService {
    padNumber(value: number) {
        if (this.isNumber(value)) {
            return `0${value}`.slice(-2);
        } else {
            return '';
        }
    }

    isNumber(value: any): boolean {
        return !isNaN(this.toInteger(value));
    }

    toInteger(value: any): number {
        return parseInt(`${value}`, 10);
    }

    dateFormat(date: Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        if (date) {
            return `${month}/${day}/${year}`;
        }

        return '';
    }

    formatDate(date: any): string {
        console.log('formatDate : ' + typeof date);
        if (typeof date === 'string') {
            const dateParts = date.trim().split('-');
            return dateParts[0] + '/' + dateParts[1] + '/' + this.toInteger(dateParts[2]);
        }
        return this.dateFormat(date);
    }

    dateCustomFormat(date: any): string {
        let stringDate: string = '';
        if (date) {
            stringDate += this.isNumber(date.month) ? this.padNumber(date.month) + '/' : '';
            stringDate += this.isNumber(date.day) ? this.padNumber(date.day) + '/' : '';

            stringDate += date.year;
        }
        return stringDate;
    }

    getDateFormatterFromString(dateInStr: string): any {
        if (dateInStr && dateInStr.length > 0) {
            const dateParts = dateInStr.trim().split('/');
            return [
                {
                    year: this.toInteger(dateParts[2]),
                    month: this.toInteger(dateParts[0]),
                    day: this.toInteger(dateParts[1])
                }
            ];
        }

        const _date = new Date();
        return [
            {
                year: _date.getFullYear(),
                month: _date.getMonth() + 1,
                day: _date.getDay()
            }
        ];
    }

    getDateFromString(dateInStr: string = ''): Date {
        if (dateInStr && dateInStr.length > 0) {
            const dateParts = dateInStr.trim().split('/');
            const year = this.toInteger(dateParts[2]);
            const month = this.toInteger(dateParts[0]);
            const day = this.toInteger(dateParts[1]);
            // tslint:disable-next-line:prefer-const
            let result = new Date();
            result.setDate(day);
            result.setMonth(month - 1);
            result.setFullYear(year);
            return result;
        }

        return new Date();
    }


    getDateStringFromDate(_date: Date = new Date()): string {
        const month = _date.getMonth() + 1;
        const year = _date.getFullYear();
        const date = _date.getDate();
        return `${month}/${date}/${year}`;
    }
}
