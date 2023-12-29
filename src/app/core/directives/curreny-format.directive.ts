import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[curreny-format]',
})
export class CurrenyFormatDirective {

    constructor(private _el: ElementRef) {
    }

    // event keyCode are 8,13,48,57
    @HostListener('input', ['$event']) onInputChange(event) {
        const initialValue = this._el.nativeElement.value.toString().replace(/[^0-9]*/g, '');
        this._el.nativeElement.value = initialValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (initialValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
