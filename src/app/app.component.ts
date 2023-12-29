import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import * as objectPath from 'object-path';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { locale as enLang } from './config/i18n/en';
import { LayoutConfigService } from '@core/util-services/layout-config.service';
import { ClassInitService } from '@core/util-services/class-init.service';
import { TranslationService } from '@core/util-services/translation.service';
import { PageConfigService } from '@core/util-services/page-config.service';
import { SplashScreenService } from '@core/util-services/splash-screen.service';
import { environment } from '@env/environment';

@Component({
    selector: 'body[m-root]',
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
    title = 'CreditSnap';

    @HostBinding('style') style: any;
    @HostBinding('class') classes: any = '';

    @ViewChild('splashScreen', { read: ElementRef })
    splashScreen: ElementRef;
    splashScreenImage: string;

    constructor(
        private layoutConfigService: LayoutConfigService,
        private classInitService: ClassInitService,
        private sanitizer: DomSanitizer,
        private translationService: TranslationService,
        private router: Router,
        private pageConfigService: PageConfigService,
        private splashScreenService: SplashScreenService
    ) {
        // subscribe to class update event
        this.classInitService.onClassesUpdated$.subscribe(classes => {
            // get body class array, join as string classes and pass to host binding class
            setTimeout(() => this.classes = classes.body.join(' '));
        });

        this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
            this.classInitService.setConfig(model);

            this.style = '';
            if (objectPath.get(model.config, 'self.layout') === 'boxed') {
                const backgroundImage = objectPath.get(model.config, 'self.background');
                if (backgroundImage) {
                    this.style = this.sanitizer.bypassSecurityTrustStyle('background-image: url(' +
                        objectPath.get(model.config, 'self.background') + ')');
                }
            }
            // this.splashScreenImage = objectPath.get(model.config, 'loader.image') + environment.institutionId + '.png';
            this.splashScreenImage = '/assets/images/logo/vlf_logo_transparent.png';
        });

        // register translations
        this.translationService.loadTranslations(enLang);

        // override config by router change from pages config
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(event => {
                this.layoutConfigService.setModel({ page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config') }, true);
            });
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        if (this.splashScreen) {
            this.splashScreenService.init(this.splashScreen.nativeElement);
        }
    }

    ngOnDestroy() {
        console.log('I am inside app on destroy');
    }
}
