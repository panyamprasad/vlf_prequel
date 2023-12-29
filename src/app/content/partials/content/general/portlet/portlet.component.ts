import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {BehaviorSubject, Observable} from 'rxjs';
import * as objectPath from 'object-path';
import {PortletSplashScreenService} from '@core/util-services/portlet-splash-screen.service';

@Component({
    selector: 'm-portlet',
    templateUrl: './portlet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortletComponent implements OnInit, AfterViewInit {
    @Input() loading$: Observable<boolean>;
    @Input() loadingSubject: BehaviorSubject<boolean>;
    @Input() options: any;

    headTools: Boolean = true;
    portletHead: Boolean = true;
    splashScreenImage: string;

    @ViewChild('mMainPageTitle') elMainPageTitle: ElementRef;
    @ViewChild('mPortlet') elPortlet: ElementRef;
    @ViewChild('mPortletHead') elHead: ElementRef;
    @ViewChild('mPortletBody') elBody: ElementRef;
    @ViewChild('mPortletFooter') elFooter: ElementRef;
    @ViewChild('mPortletHeadTools') elHeadTools: ElementRef;
    @ViewChild('mPortletSplashScreen') elMsplashScreen: ElementRef;
    @ViewChild('mScrollTop') elScrollTop: ElementRef;
    scrollTop: any;

    constructor(public loader: LoadingBarService,
                public splashScreenService: PortletSplashScreenService) {
        this.loader.complete();
    }

    ngAfterViewInit(): void {

        /* if (this.loadingSubject) {
             this.splashScreenService.load(this.elMsplashScreen.nativeElement, this.loadingSubject);
         }*/
        // remove the head tools if option is set
        if (objectPath.get(this.options, 'headTools')) {
            this.headTools = objectPath.get(this.options, 'headTools');
        }
        if (this.elMainPageTitle && this.elMainPageTitle.nativeElement.children.length === 0) {
            console.log(' m portlet pageTitle : ');
            this.elMainPageTitle.nativeElement.style.display = 'none';
        }
        if (this.elBody && this.elBody.nativeElement.children.length === 0) {
            console.log(' m portlet elBody : ');
            this.elBody.nativeElement.style.display = 'none';
        }
        if (objectPath.get(this.options, 'headAuto')) {
            console.log(' m-portlet head auto');
            this.elHead.nativeElement.style.height = 'auto';
        }

        this.portletHead = objectPath.get(this.options, 'portletHead');
        if (this.portletHead === undefined) {
            this.portletHead = true;
        }
        // hide portlet footer if no content
        if (this.elFooter && this.elFooter.nativeElement.children.length === 0) {
            this.elFooter.nativeElement.style.display = 'none';
            this.elPortlet.nativeElement.classList.add('m-portlet--full-height');
        }
        // add portlet responsive mobile for sticky portlet
        if (objectPath.get(this.options, 'enableSticky')) {
            this.elPortlet.nativeElement.classList.add('m-portlet--responsive-mobile');
        }
        // hide portlet header tools if no content
        if (!this.portletHead) {
            this.elHead.nativeElement.style.display = 'none';
        } else if (this.elHeadTools && this.elHeadTools.nativeElement.children.length === 0) {
            this.elHeadTools.nativeElement.style.display = 'none';
        }
        this.splashScreenImage = './assets/app/default/media/img/logo/logo_ifs.png';
        const top = this.elScrollTop.nativeElement.offsetTop;
        this.elScrollTop.nativeElement.scrollTop = top;
        /* this.scrollTop = new mScrollTop(this.elScrollTop.nativeElement, {
             offset: top,
             speed: 600
         });*/
    }

    ngOnInit() {
    }
}
