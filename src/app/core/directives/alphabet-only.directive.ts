import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: 'input[alphabetOnly]'
})
export class AlphabetDirective {

    constructor(private _el: ElementRef) {
    }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this._el.nativeElement.value;
        //this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z_ ]/g, '').trim();
        this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z '-]/g, '');
        this._el.nativeElement.value = this._el.nativeElement.value.replace(/^\s+/g, '');
        if (initalValue !== this._el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}