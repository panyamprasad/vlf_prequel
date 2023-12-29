export class AddressModel {
    addressId: number;
    streetAddress: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    addressUsage: string; // 0 = Home | 1 = Mailing |  2 = Temporary
    type: string; // 0 = Business | 1 = Residential
    county: string;
    current: Boolean;

    clear() {
        this.streetAddress = '';
        this.addressLine2 = '';
        this.city = '';
        this.state = '';
        this.zipCode = '';
        this.addressUsage = 'PRIMARY';
        this.type = '';
        this.current = true;
    }
}
