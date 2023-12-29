import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
    selector: '[phone-mask]',
})
export class PhoneMaskDirective {
    @Output('phone-mask') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

    constructor(public elRef: NgControl) {
    }

    @HostListener('blur')
    handleClick() {
        this.markFieldsAsDirty();
        this.emitIfValid();
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
        if (backspace && newVal.length <= 6) {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        if (newVal.length === 0) {
            newVal = '';
        } else if (newVal.length <= 3) {
            newVal = newVal.replace(/^(\d{0,3})/, '($1)');
        } else if (newVal.length <= 6) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (newVal.length <= 10) {
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
        } else {
            newVal = newVal.substring(0, 10);
            newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
        }
        this.elRef.valueAccessor.writeValue(newVal.trim());
    }

    private markFieldsAsDirty() {
        if (!this.elRef.value) {
            this.elRef.control.setErrors({'min-max': true});
            return;
        }
        const phone = this.elRef.value.toString().replace(/([\s,.€()_-])+/g, '');
        if (!(phone.length === 10)) {
            this.elRef.control.setErrors({'min-max': true});
        }
    }

    private emitIfValid() {
        if (this.elRef.valid) {
            this.valid.emit();
        }
    }
}
