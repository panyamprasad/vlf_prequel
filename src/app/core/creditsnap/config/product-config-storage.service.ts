import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProductConfig} from '@config/product';

@Injectable()
export class ProductConfigStorageService {
    constructor() {
    }

    saveConfig(productConfig: ProductConfig): void {
        if (productConfig != null) {
            // config storage
            localStorage.setItem('productConfig', JSON.stringify(productConfig));
        }
    }

    getSavedConfig(): Observable<ProductConfig> {
        const config: any = localStorage.getItem('productConfig');
        try {
            return of(JSON.parse(config));
        } catch (e) {
        }
    }

    loadConfig(): Observable<ProductConfig> {
        return this.getSavedConfig().pipe(
            map(config => {
                return Object.assign({}, new ProductConfig(), config);
            })
        );
    }

    resetConfig(): void {
        localStorage.removeItem('productConfig');
    }
}
