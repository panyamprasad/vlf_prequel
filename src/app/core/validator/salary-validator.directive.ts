import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[salary-validator]'
})
export class SalaryValidatorDirective {
    @Output('salary-validator') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

    constructor(private elRef: NgControl) {
    }

    @HostListener('blur')
    handleClick() {
        this.markFieldsAsDirty();
        this.emitIfValid();
    }

    private markFieldsAsDirty() {
        console.log('SalaryValidatorDirective direction => ', this.elRef.name, isNaN(this.elRef.value), this.elRef.value);
        let elDirty = false;
        const name = this.elRef.name;
        if (this.elRef.value === undefined || this.elRef.value === null) {
            elDirty = true;
        } else {
            this.elRef.control.setErrors({'salary': 'Your monthly estimated salary gross: $' + this.elRef.control.value / 12});
        }
    }

    private emitIfValid() {
        if (this.elRef.valid) {
            this.valid.emit();
        }
    }
}
