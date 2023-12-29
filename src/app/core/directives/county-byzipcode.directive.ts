import {Directive, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

declare var google: any;

@Directive({
    selector: '[zipcode-county]'
})
export class CountyByzipcodeDirective implements OnInit {
    @Output() onSelect: EventEmitter<any> = new EventEmitter();
    private element: HTMLInputElement;
    private options: any;

    constructor(elRef: ElementRef) {
        /* elRef will get a reference to the element where the directive is placed */
        this.element = elRef.nativeElement;
        this.options = {
            componentRestrictions: {country: ['US'], types: ['(postal_code)']}
        };
    }

    getFormattedAddress(place) {
        /*  @params: place - Google Autocomplete place object
            @returns: location_obj - An address object in human readable format */
        const location_obj: {} = {};
        place.address_components.forEach(function (element) {
            const item = element;
            location_obj['formatted_address'] = place.formatted_address;
            if (item['types'].indexOf('locality') > -1) {
                location_obj['locality'] = item['long_name'];
            } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
                location_obj['admin_area_l1'] = item['short_name'];
            } else if (item['types'].indexOf('street_number') > -1) {
                location_obj['street_number'] = item['short_name'];
            } else if (item['types'].indexOf('route') > -1) {
                location_obj['route'] = item['long_name'];
            } else if (item['types'].indexOf('country') > -1) {
                location_obj['country'] = item['long_name'];
            } else if (item['types'].indexOf('postal_code') > -1) {
                location_obj['postal_code'] = item['short_name'];
            } else if (item['types'].indexOf('administrative_area_level_2') > -1) {
                location_obj['county'] = item['long_name'].replace(/\County$/i, '').trim();
            }
        });
        return location_obj;
    }

    ngOnInit() {
        const autocomplete = new google.maps.places.Autocomplete(this.element, this.options);
        // Event listener to monitor place changes in the input
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            // Emit the new address object for the updated place
            if (this.element.value && this.element.value.length > 4) {
                this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
            }
        });
    }

}
