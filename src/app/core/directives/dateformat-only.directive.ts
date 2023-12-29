import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: 'input[dateFormateOnly]'
})
export class DateFormateDirective {

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
        if (backspace && (enterVal.length === 5 || enterVal.length === 2)) {
            enterVal = enterVal.substring(0, enterVal.length - 1);
        }
        if (enterVal.length === 2 || enterVal.length === 5) {
            enterVal += '/';
        }
        this._el.nativeElement.value = enterVal;
        // this._el.nativeElement.value= isMoment(enterVal).format('YYYY-MM-DD');
    }
}
