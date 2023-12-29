import {HttpClient} from '@angular/common/http';
import {AppConfigService} from '@service/config/app-config.service';

export function AppConfigFactory(
    http: HttpClient,
    config: AppConfigService,
    /* Extra dependencies */
): () => Promise<any> {
    return (): Promise<any> => {
        return new Promise((resolve, reject) => {
            const configDeps: Promise<any>[] = [];
            // All logic needed

            config.init().then(() =>{
                return Promise.all(configDeps);
            }).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });

            // Add functions that return a Promise
            /* configDeps.push(configB(http, config, /!* Extra dependencies *!/)); // Will handle request B
               configDeps.push(configC(http, config, /!* Extra dependencies *!/)); // Will handle request C*/

            // Return resolved Promise when dependant functions are resolved


        });
    };
}
