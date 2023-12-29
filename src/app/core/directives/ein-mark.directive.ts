import { Directive,EventEmitter, HostListener, Output  } from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[mEinMark]'
})
export class EinMarkDirective {
    @Output('mEinMark') valid = new EventEmitter<void>(); // tslint:disable-line:no-output-rename

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

  @HostListener('blur')
  handleClick() {
      this.markFieldsAsDirty();
      this.emitIfValid();
      this.maskForEIN();
  }
  /* @HostListener("focusout")
    setInputFocusout(): void {
       this.maskForEIN();
    }*/

  @HostListener("focus")
  setInputFocus(): void {
      let inputVal=this.elRef.control.value;
      this.elRef.control.setValue(inputVal);	
  }
  onInputChange(event, backspace) {
    let newVal = event != null ?  event.toString().replace(/\D/g, ''):"";
    if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
        newVal = '';
    } else if (newVal.length <= 2) {
        newVal = newVal.replace(/^(\d{0,2})/, '$1');
    } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1-$2');
    } else if (newVal.length <= 9) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, '$1-$2$3');
    } else {
        newVal = newVal.substring(0, 9);
        newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, '$1-$2$3');
    }
    // console.log('directive => ', newVal);
    this.elRef.valueAccessor.writeValue(newVal);
}

  private markFieldsAsDirty() {
      if (!this.elRef.value) {
          this.elRef.control.setErrors({'min-max': true});
          return;
      }
      const text = this.elRef.value.toString().replace(/([\s,.€()_-])+/g, '');
      if (!(text.length === 9 || text.length === 10)) {
          this.elRef.control.setErrors({'min-max': true});
      }
  }

  private emitIfValid() {
      if (this.elRef.valid) {
          this.valid.emit();
      }
  }
  private maskForEIN() {
    let inputVal=this.elRef.control.value;
        if(inputVal){
			if(inputVal.length >=10 || inputVal.length == 9 ){
		    var temp=inputVal;
	 		var regxa = /^(\d{2}-?\d{3}?\d{4})$/;
		    if(inputVal.length == 11 ){
			  temp = temp.substring(0, temp.length - 1);
	        }
			if (regxa.test(temp)) {  
				this.elRef.control.setValue(temp);		
				temp.length == 9 ? this.elRef.valueAccessor.writeValue("XX-XXX" + temp.slice(5)):this.elRef.valueAccessor.writeValue("XX-XXX" + temp.slice(6));  // change displayed value
	        }
	   		}
        }
	 } 
}
