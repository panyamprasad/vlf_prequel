// tslint:disable-next-line:no-shadowed-variable
import { ConfigModel } from '../core/interfaces/config';

// tslint:disable-next-line:no-shadowed-variable
export class MenuConfig implements ConfigModel {
    public config: any = {};

    constructor() {
        this.config = {
            header: {
                self: {},
                items: [
                    {
                        title: 'New Application',
                        page: '',
                        href: true,
                        internal: 1,
                        toggle: 'click',
                    },
                    {
                        title: 'Find My Application',
                        page: '/myApp',
                        href: true,
                        internal: 1,
                        toggle: 'click',
                    },
                    {
                        title: 'Return to VeteranFund',
                        page: 'https://peoplefund.org',
                        href: true,
                        internal: 1,
                        toggle: 'click'
                    }
                ]
            }
        };
    }
}
