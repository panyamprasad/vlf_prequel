import {ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnInit} from '@angular/core';
import * as objectPath from 'object-path';
import {DOCUMENT} from '@angular/common';
import {ClassInitService} from '@core/util-services/class-init.service';
import {LayoutConfigService} from '@core/util-services/layout-config.service';
import {HeaderService} from '@core/util-services/layout/header.service';
import {environment} from '@env/environment';
import {HttpUtilsService} from '@core/_helpers';

@Component({
    selector: 'm-customer-brand',
    templateUrl: './brand.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandComponent implements OnInit {
    @HostBinding('class') classes = 'm-stack__item m-brand';
    @Input() menuAsideLeftSkin: any = '';
    @Input() menuAsideMinimizeDefault: any = false;
    @Input() menuAsideMinimizToggle: any = false;
    @Input() menuAsideDisplay: any = false;
    @Input() menuHeaderDisplay: any = true;
    @Input() headerLogo: any = '';
    @Input() headerPLogo: any = '';
    isPartnerLogoAvailable: boolean = false;

    constructor(
        private classInitService: ClassInitService,
        private layoutConfigService: LayoutConfigService,
        public headerService: HeaderService,
        private httpUtilService: HttpUtilsService,
        @Inject(DOCUMENT) private document: Document
    ) {
        // subscribe to class update event
        this.classInitService.onClassesUpdated$.subscribe(classes => {
            this.classes = 'm-stack__item m-brand ' + classes.brand.join(' ');
        });

        this.layoutConfigService.onLayoutConfigUpdated$.subscribe(model => {
            this.menuAsideLeftSkin = objectPath.get(model, 'config.aside.left.skin');

            this.menuAsideMinimizeDefault = objectPath.get(model, 'config.aside.left.minimize.default');

            this.menuAsideMinimizToggle = objectPath.get(model, 'config.aside.left.minimize.toggle');

            this.menuAsideDisplay = objectPath.get(model, 'config.menu.aside.display');

            this.menuHeaderDisplay = objectPath.get(model, 'config.menu.header.display');

            this.headerLogo = environment.s3Images + environment.institutionId + '/logo.png';
            // debugger;
            //  if (this.headerService.partnerImageToken === 'creditkarma' ||
            //      this.headerService.partnerImageToken === 'creditkarma-leasebuyout' ||
            //      this.headerService.partnerImageToken === 'nerdwallet' ||
            //      this.headerService.partnerImageToken === 'lendingTree' ||
            //      this.headerService.partnerImageToken === 'OneSource') {
            //
            if (this.headerService.partnerImageToken) {
                this.headerPLogo = `${environment.s3Images}${environment.institutionId}/${this.headerService.partnerImageToken}_logo.png`;
                this.isPartnerLogoAvailable = true;
            } else {
                this.isPartnerLogoAvailable = false;
            }
        });
    }

    ngOnInit(): void {
    }

    /**
     * Toggle class topbar show/hide
     * @param event
     */
    clickTopbarToggle(event: Event): void {
        this.document.body.classList.toggle('m-topbar--on');
    }

    errorCb() {
        this.isPartnerLogoAvailable = false;
    }
}
