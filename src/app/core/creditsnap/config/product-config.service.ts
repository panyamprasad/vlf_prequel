import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ProductConfig} from '@config/product';
import {ProductConfigStorageService} from '@service/config/product-config-storage.service';
import {environment} from '@env/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductConfigService {
    public productConfig: ProductConfig;
    public onProductConfigUpdated$: BehaviorSubject<ProductConfig>;

    constructor(private router: Router,
                private productConfigStorageService: ProductConfigStorageService) {
        // default config
        this.productConfig = new ProductConfig(environment.institutionId);
        // register on config changed event and set default config
        this.onProductConfigUpdated$ = new BehaviorSubject(this.productConfig);
    }

    /**
     * Reset existing configurations
     * NOTE: This method will remove older config and pass only new;
     * @param model
     * @param doNotSave
     */
    setModel(model: any, doNotSave?: boolean): void {
        // merge and replace existing config object
        // deep merge for mutltidimentional arrays
        this.productConfig = Object.assign({}, this.productConfig, model);

        if (!doNotSave) {
            this.productConfigStorageService.saveConfig(this.productConfig);
        }

        // fire off an event that all subscribers will listen
        this.onProductConfigUpdated$.next(this.productConfig);
    }

    /*reloadSavedConfig(): void {
        this.setModel(new ProductConfig(this.getSavedConfig()), true);
    }*/

    /**
     * Set current config as default template.
     * This config is changeable via layout builder.
     * Useful when want to reset layout without clearing the config at layout
     */
    getSavedConfig() {
        return this.productConfigStorageService.loadConfig();
    }
}
