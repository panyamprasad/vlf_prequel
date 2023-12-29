import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MatIconModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {ScrollTopComponent} from '@content/partials/layout/scroll-top/scroll-top.component';
import {NoticeComponent} from '@content/partials/content/general/notice/notice.component';
import {AlertComponent} from '@core/_shared/alert/alert.component';
import {PortletModule} from '@content/partials/content/general/portlet/portlet.module';
import {PortletChildModule} from '@content/partials/content/general/portlet-child/portlet-child.module';
import {SpinnerButtonModule} from '@content/partials/content/general/spinner-button/spinner-button.module';
import {CoreModule} from '@core/core.module';


@NgModule({
    declarations: [
        ScrollTopComponent,
        NoticeComponent,
        AlertComponent
    ],
    exports: [
        ScrollTopComponent,
        NoticeComponent,
        PortletModule,
        SpinnerButtonModule,
        PortletChildModule,
        MatIconModule
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbModule,
        PerfectScrollbarModule,
        CoreModule,
        PortletModule,
        PortletChildModule,
        SpinnerButtonModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatIconModule
    ]
})
export class PartialsModule {
}
