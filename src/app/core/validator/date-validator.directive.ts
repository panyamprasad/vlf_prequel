import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[date-validate][ngModel]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: ValidateDateDirective, multi: true}
    ]
})
export class ValidateDateDirective implements Validator {

    private _valFn: ValidatorFn;

    constructor() {
        this._valFn = this.dateValidator();
    }

    validate(control: AbstractControl) {
        console.log(' inside the validate =>', this._valFn(control));
        return this._valFn(control);
    }

    dateValidator(): ValidatorFn {

        const DATE_REGEX = new RegExp(/^(\d{2}|\d{1})\/(\d{2}|\d{1})\/\d{4}$/);

        return (control: AbstractControl): { [key: string]: any } => {
            console.log('dateValidator =>', control.value);
            // Object to return if date is invalid
            const invalidObj = {'invalidDate': true};
            if (control.value === undefined || control.value === null) {
                return invalidObj;
            }
            const dateStr = control.value;
            // Length of months (will update for leap years)
            const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            // First check for m/d/yyyy or mm/dd/yyyy format
            // If the pattern is wrong, don't validate dates yet
            if (!DATE_REGEX.test(dateStr)) {
                return null;
            }

            // Parse the date input to integers
            const parts = dateStr.split('/');
            const month = parseInt(parts[0], 10);
            const day = parseInt(parts[1], 10);
            const year = parseInt(parts[2], 10);
            const now = new Date();

            // Make sure date is in range
            if (year < now.getFullYear() || year > 3000 || month === 0 || month > 12) {
                console.log(' inside the validator =>', year, month);
                return invalidObj;
            }
            // Adjust for leap years
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                monthLength[1] = 29;
            }
            // Check the range of the day
            if (!(day > 0 && day <= monthLength[month - 1])) {
                return invalidObj;
            }
            // If date is properly formatted, check the date vs today to ensure future
            // This is done this way to account for new Date() shifting invalid
            // date strings. This way we know the string is a correct date first.
            const date = new Date(dateStr);
            if (date <= now) {
                return invalidObj;
            }
            return null;
        };
    }
}
