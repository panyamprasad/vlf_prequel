import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import {NgxPermissionsModule} from 'ngx-permissions';

import 'hammerjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GestureConfig, MatDialogModule, MatDialogRef, MatFormFieldModule, MatProgressSpinnerModule, MAT_DIALOG_DATA} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {UtilsService} from '@core/util-services/utils.service';
import {PartialsModule} from '@content/partials/partials.module';
import {NotificationService} from '@core/util-services/notification/notification.service';
import {ErrorsModule} from '@core/errors';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '@core/core.module';
import {AuthenticationModule} from '@core/auth/authentication.module';
import {LayoutRefService} from '@core/util-services/layout/layout-ref.service';
import {PageConfigService} from '@core/util-services/page-config.service';
import {ClassInitService} from '@core/util-services/class-init.service';
import {LayoutConfigStorageService} from '@core/util-services/layout-config-storage.service';
import {MenuConfigService} from '@core/util-services/menu-config.service';
import {LogsService} from '@core/util-services/logs.service';
import {SplashScreenService} from '@core/util-services/splash-screen.service';
import {DataTableService} from '@core/util-services/datatable.service';
import {LayoutConfigService} from '@core/util-services/layout-config.service';
import {AppComponent} from './app.component';
import {SubheaderService} from '@core/util-services/layout/subheader.service';
import {MenuHorizontalService} from '@core/util-services/layout/menu-horizontal.service';
import {HeaderService} from '@core/util-services/layout/header.service';
import {ClipboardService} from '@core/util-services/clipboard.sevice';
import {AclService} from '@core/util-services/acl.service';
import {HttpAuthInterceptor} from '@core/auth/http-intercept.service';
import {ProductConfigStorageService} from '@service/config/product-config-storage.service';
import {AppConfigFactory} from '@service/config/app-config.factory';
import {AppConfigService} from '@service/config/app-config.service';
import { MyMaterialModule } from '@customer/material.module';
import {AboutService} from './services/about.service';
import { AboutBusinessComponent } from './customer/about-business/about-business.component';
import {HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { MyDialogComponent } from './customer/my-dialog/my-dialog.component';
import { MyDialogCancelComponent } from './customer/my-dialog/my-dialog.cancelComponent'
import { from } from 'rxjs';
import { ConfirmDeleteDialogComponent } from './customer/confirm-delete-dialog/confirm-delete-dialog.component';
import { MyDialogReviewSaveExitComponent } from '@customer/my-dialog/my-dialog.reviewSaveExit.component';
import { MyDialogReviewDataSaveExitComponent } from '@customer/my-dialog/my-dialog.reviewDataSaveExit.component';
import { MyDialogOfferSaveExitComponent } from '@customer/my-dialog/my-dailog.offerSaveExit.component';
import { MyDialogCustomerCancelComponent } from '@customer/my-dialog/my-dailog.customerState.component';
import { LoadingComponent } from '@customer/reviewdata/loading';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    entryComponents: [
        MyDialogComponent,
        MyDialogCancelComponent,
        ConfirmDeleteDialogComponent,
        MyDialogReviewSaveExitComponent,
        MyDialogReviewDataSaveExitComponent,
        MyDialogOfferSaveExitComponent,
        MyDialogCustomerCancelComponent,
        LoadingComponent
    ],
    declarations: [
        AppComponent,
        MyDialogComponent,
        MyDialogCancelComponent,
        ConfirmDeleteDialogComponent,
        MyDialogReviewSaveExitComponent,
        MyDialogReviewDataSaveExitComponent,
        MyDialogOfferSaveExitComponent,
        MyDialogCustomerCancelComponent,
        LoadingComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        PartialsModule,
        CoreModule,
        OverlayModule,
        AuthenticationModule,
        NgxPermissionsModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot(),
        MatProgressSpinnerModule,
        MatProgressButtonsModule.forRoot(),
        ErrorsModule,
        MyMaterialModule,
        MatDialogModule,
        MatFormFieldModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: AppConfigFactory,
            multi: true,
            deps: [HttpClient, AppConfigService]
        },
        {
            provide: MatDialogRef,
            useValue: {}
        },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        AclService,
        NotificationService,
        LayoutConfigService,
        LayoutConfigStorageService,
        LayoutRefService,
        MenuConfigService,
        PageConfigService,
        ProductConfigStorageService,
        ClassInitService,
        ClipboardService,
        LogsService,
        DataTableService,
        SplashScreenService,
        AboutService,
        UtilsService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        // template services
        SubheaderService,
        HeaderService,
        MenuHorizontalService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthInterceptor,
            multi: true
        },
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
