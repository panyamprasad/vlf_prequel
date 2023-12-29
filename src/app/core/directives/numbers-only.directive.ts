import {Directive, ElementRef, HostListener} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberDirective {

    constructor(private _el: ElementRef,public elRef: NgControl) {
    }

    // event keyCode are 8,13,48,57
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value.toString().replace(/[^0-9]*/g, '');
        this._el.nativeElement.value = initalValue.toString().replace(/\B(?=(\d{8})+(?!\d))/g, ',');
        if (initalValue !== this._el.nativeElement.value) {
            // event.stopPropagation();
            this.elRef.control.setErrors({'min-max': true});
        }
    }
}
