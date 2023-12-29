import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    static config: any = {};
    public onAppConfigUpdated$: BehaviorSubject<any>;
    // public productConfig: any;
    private institutionId = environment.institutionId;

    constructor() {
    }

    init() {
        return new Promise((resolve, reject) => {

            // @ts-ignore
            import(`../../../config/institutionConfig/config-${this.institutionId.toLowerCase()}`)
                .then((data: any) => {

                    AppConfigService.config = data.config;
                    // this.productConfig = this.config.productConfig;

                    // register on config changed event and set default config
                    this.onAppConfigUpdated$ = new BehaviorSubject(AppConfigService.config);
                    resolve();
                })
                .catch(() => {
                    // @ts-ignore
                    import(`../../../config/institutionConfig/config`)
                        .then((data: any) => {

                            AppConfigService.config = data.config;
                            // this.productConfig = this.config.productConfig;

                            // register on config changed event and set default config
                            this.onAppConfigUpdated$ = new BehaviorSubject(AppConfigService.config);
                            resolve();
                        });
                });
        });

    }

    static getConfig() {
        return AppConfigService.config;
    }

    get(key: string): any {
        // Method implementation
    }

    set(key: string, value: any): void {
        // Method implementation
    }

}
