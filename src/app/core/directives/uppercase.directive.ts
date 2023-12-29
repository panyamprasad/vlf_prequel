import {Directive, ElementRef, HostListener,  EventEmitter, Output} from '@angular/core';

@Directive({
    selector: 'input[upperCase]',
})
export class UppercaseDirective {
    @Output() ngModelChange = new EventEmitter();
    constructor(private _el: ElementRef) {
    }

    @HostListener('blur') onBlur() {
        this._el.nativeElement.value = this._el.nativeElement.value.trim().toUpperCase();
        this.ngModelChange.emit(this._el.nativeElement.value);
    }

    @HostListener('change') onChange() {
        this._el.nativeElement.value = this._el.nativeElement.value.trim().toUpperCase();
        this.ngModelChange.emit(this._el.nativeElement.value);
    }
}
