import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[date-mask]',
})
export class DateMaskDirective {

    constructor(private _el: ElementRef) {
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event, true);
    }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    onInputChange(event, backspace) {
        let enterVal = this._el.nativeElement.value;
        if (enterVal.length === 2 && !this.isValidateMonth(enterVal)) {
            return false;
        }
        if (backspace && (enterVal.length === 5 || enterVal.length === 2)) {
            enterVal = enterVal.substring(0, enterVal.length - 1);
        }
        if (enterVal.length === 2 || enterVal.length === 5) {
            enterVal += '/';
        }
        this._el.nativeElement.value = enterVal;
        // this._el.nativeElement.value= isMoment(enterVal).format('YYYY-MM-DD');
    }

    isValidateMonth(mm: number): boolean {
        if (mm < 1 || mm > 12) {
            return false;
        }
        return true;
    }

    isValidDate(MM: any, DD: any, YYYY: any): boolean {
        if (MM < 1 || MM > 12) {
            return false;
        }
        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];​
        // Adjust for leap years
        if (YYYY % 400 === 0 || (YYYY % 100 !== 0 && YYYY % 4 === 0)) {
            monthLength[1] = 29;
        }
        // Check the range of the day
        if (DD <= 0 || DD > monthLength[MM - 1]) {
            return false;
        }
        return true;
    }
}
