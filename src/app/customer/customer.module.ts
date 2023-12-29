import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { CustomizeOfferComponent } from '@customer/customize-offer/customize-offer.component';
import { ActionNotificationComponent } from '@core/_shared/action-natification/action-notification.component';
import { CustomerComponent } from '@customer/customer.component';
import { AboutComponent } from '@customer/about/about.component';
import { ThankYouComponent } from '@customer/thank-you/thank-you.component';
import { LoadingComponent } from '@core/loading/LoadingComponent';
import { PartialsModule } from '@content/partials/partials.module';
import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@customer/layout/layout.module';
import { MyMaterialModule } from '@customer/material.module';
import { HttpUtilsService } from '@core/_helpers';
import { LayoutUtilsService } from '@core/util-services/utils/layout-utils.service';
import { CustomerRoutingModule } from '@customer/customer-routing.module';
import { ErrorPageComponent } from '@content/partials/snippets/error-page/error-page.component';
import { ApplicantComponent } from '@customer/about/applicant/applicant.component';
import { PortletSplashScreenService } from '@core/util-services/portlet-splash-screen.service';
import { ApplicationComponent } from './application/application.component';
import { Ng5SliderModule } from 'ng5-slider';
import { RedirectComponent } from '@customer/redirect/redirect.component';
import { AboutBusinessComponent } from '@customer/about-business/about-business.component';
import { FileUploadButtonComponent } from '@customer/file-upload-button/file-upload-button.component';
import { ReviewComponent } from './review/review.component';
import { PhoneNumberPipe } from '../core/pipes/phone-number.pipe';
import { ReviewdataComponent } from './reviewdata/reviewdata.component';
import { EinPipe } from '@core/pipes/ein.pipe';
import { SsnPipe } from '@core/pipes/ssn.pipe';
import { ResumeApplicationComponent } from './resume-existing-application/resume-application.component';
import { LandingComponent } from './landing-page/landing-page.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { StartScreenComponent } from './welcome/welcome.component';
import { BusinessInfoComponent } from './resume-existing-application/business-info/business-info.component';
import { BusinessDurationComponent } from './resume-existing-application/business-duration/business-duration.component';
import { ScreeningProcessComponent } from './resume-existing-application/screening-process/screening-process.component';
import { ResidentialAddressComponent } from './resume-existing-application/residential-address/residential-address.component';
import { ContactInfoComponent } from './resume-existing-application/contact-info/contact-info.component';
import { BusinessAddressComponent } from './resume-existing-application/business-address/business-address.component';
import { ResumeProfileComponent } from './resume-existing-application/resume-profile/resume-myprofile.component';
import { MoneyBorrowingComponent } from './resume-existing-application/money-borrowing/money-borrowing.component';

@NgModule({
    entryComponents: [
        ActionNotificationComponent
    ],
    declarations: [
        ActionNotificationComponent,
        CustomerComponent,
        AboutComponent,
        AboutBusinessComponent,
        ThankYouComponent,
        LoadingComponent,
        CustomizeOfferComponent,
        ApplicantComponent,
        ErrorPageComponent,
        ApplicationComponent,
        RedirectComponent,
        FileUploadButtonComponent,
        ReviewComponent,
        ReviewdataComponent,
        PhoneNumberPipe,
        EinPipe,
        SsnPipe,
        ResumeApplicationComponent,
        LandingComponent,
        LoanPurposeComponent,
        StartScreenComponent,
        ResumeProfileComponent,
        MoneyBorrowingComponent,
        BusinessInfoComponent,
        BusinessDurationComponent,
        ScreeningProcessComponent,
        ContactInfoComponent,
        ResidentialAddressComponent,
        BusinessAddressComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        PartialsModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        CoreModule,
        LayoutModule,
        PartialsModule,
        MyMaterialModule,
        CustomerRoutingModule,
        Ng5SliderModule
    ],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: true,
                panelClass: 'm-mat-dialog-container__wrapper',
                height: 'auto',
                width: '900px'
            }
        },
        HttpUtilsService,
        LayoutUtilsService,
        PortletSplashScreenService
    ]
})
export class CustomerModule {
}
