// Custom DateAdapter
import {Inject, NgModule, Optional} from '@angular/core';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends MomentDateAdapter {
    constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
        super(dateLocale);
    }

    /*parse(value, parseFormat) {
       // console.log('CustomDateAdapter called =>', value, parseFormat);
        // console.log('after CustomDateAdapter called =>', value, parseFormat);
        if (value && typeof value == 'string') {
            if (value.length === 2 || value.length === 5) {
                value = value + '/';
            }
            console.log(' indise => ', value, moment(value, parseFormat, this.locale, true));
            return moment(value, parseFormat, this.locale, true);
        }
        return value ? moment(value).locale(this.locale) : undefined;
    }
    format(date: Moment, displayFormat: string): string {
        console.log('CustomDateAdapter called =>', date, displayFormat);
        const day = date.day();
        const month = date.month();
        const year = date.year();
        // Return the format as per your requirement
        return `${month}/${day}/${year}`;
    }*/

    // If required extend other NativeDateAdapter methods.
}

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_DATE_FORMATS = {
    parse: {
        dateInput: 'MM/DD/YYYY',
    },
    display: {
        dateInput: 'MM/DD/YYYY',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@NgModule({
    declarations: [],
    imports: [],
    exports: [MatDatepickerModule, MatNativeDateModule],
    providers: [
        {
            provide: DateAdapter, useClass: CustomDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
        }
    ]
})

export class DatePickerModule {
}
