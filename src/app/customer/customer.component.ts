import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as objectPath from 'object-path';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { LayoutConfigService } from '../core/util-services/layout-config.service';
import { ClassInitService } from '../core/util-services/class-init.service';
import { LayoutRefService } from '../core/util-services/layout/layout-ref.service';
import { NotificationService } from '../core/util-services/notification/notification.service';
import { HeaderService } from '@core/util-services/layout/header.service';
import * as urlParse from 'url-parse';
import { UrlObject } from 'url';

@Component({
    selector: 'm-customer-pages',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None

})
export class CustomerComponent implements OnInit, AfterViewInit {
    @HostBinding('class') classes = 'm-grid m-grid--hor m-grid--root m-page';
    @Input() selfLayout: any = 'blank';

    public player: AnimationPlayer;
    notification: string;
    showNotification: boolean;

    // class for the header container
    pageBodyClass$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    @ViewChild('mContentWrapper') contentWrapper: ElementRef;
    @ViewChild('mContent') mContent: ElementRef;


    constructor(private activatedRoute: ActivatedRoute,
        private el: ElementRef,
        private configService: LayoutConfigService,
        public classInitService: ClassInitService,
        private router: Router,
        private layoutRefService: LayoutRefService,
        private animationBuilder: AnimationBuilder,
        public headerService: HeaderService,
        private notificationService: NotificationService
    ) {
        this.configService.onLayoutConfigUpdated$.subscribe(model => {
            const config = model.config;
            this.updateURLIdentifiers();
            let pageBodyClass = '';
            this.selfLayout = objectPath.get(config, 'self.layout');
            if (this.selfLayout === 'boxed' || this.selfLayout === 'wide') {
                pageBodyClass += ' m-container m-container--responsive m-container--xxl m-page__container';
            }
            this.pageBodyClass$.next(pageBodyClass);
        });
        // animate page load
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.contentWrapper) {
                    // hide content
                    this.contentWrapper.nativeElement.style.display = 'none';
                }
            }
            if (event instanceof NavigationEnd) {
                if (this.contentWrapper) {
                    // show content back
                    this.contentWrapper.nativeElement.style.display = '';
                    // animate the content
                    this.animate(this.contentWrapper.nativeElement);
                }
            }
        });
    }

    ngOnInit(): void {
        this.notificationService.notification$.subscribe(message => {
            this.notification = message;
            this.showNotification = true;
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this.mContent) {
                // keep content element in the service
                this.layoutRefService.addElement('content', this.mContent.nativeElement);
            }
        });
    }

    updateURLIdentifiers() {
        const obj: UrlObject = urlParse(this.router.url, true);
        const urlParams = obj.pathname.split(/[/;?]+/);
        console.log('urlParams', urlParams);
        if (typeof urlParams === 'object' && urlParams.length >= 2) {
            this.headerService.partnerImageToken = urlParams[2];
        }
        // if (obj.query.utm_source) {
        //     this.headerService.partnerImageToken = 'lendingTree';
        // }

    }

    /**
     * Animate page load
     */
    animate(element) {
        this.player = this.animationBuilder
            .build([
                style({ opacity: 0, transform: 'translateY(15px)' }),
                animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
                style({ transform: 'none' }),
            ])
            .create(element);
        this.player.play();
    }
}
