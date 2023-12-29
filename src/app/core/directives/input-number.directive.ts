import {Directive, HostListener} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[input-num]',
})
export class InputNumberDirective {

    constructor(public elRef: NgControl) {
    }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event, false);
    }

    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
        this.onInputChange(event.target.value, true);
    }

    onInputChange(event, backspace) {
        let newVal = event.replace(/\D/g, '');
        if (this.elRef.name === 'zipCode') {
            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 5) {
                newVal = newVal.replace(/^(\d{0,5})/, '$1');
            } else {
                newVal = newVal.substring(0, 5);
            }
        }
        this.elRef.valueAccessor.writeValue(newVal);
    }
}
