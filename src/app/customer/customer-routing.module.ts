import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '@customer/customer.component';
import { AboutComponent } from '@customer/about/about.component';
import { ErrorPageComponent } from '@content/partials/snippets/error-page/error-page.component';
import { ThankYouComponent } from '@customer/thank-you/thank-you.component';
import { RedirectComponent } from '@customer/redirect/redirect.component';
import { AboutBusinessComponent } from '@customer/about-business/about-business.component';
import { CustomizeOfferComponent } from './customize-offer/customize-offer.component';
import { ReviewComponent } from './review/review.component';
import { ReviewdataComponent } from './reviewdata/reviewdata.component';
import { ResumeApplicationComponent } from './resume-existing-application/resume-application.component';
import { LandingComponent } from './landing-page/landing-page.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { StartScreenComponent } from './welcome/welcome.component';
import { MoneyBorrowingComponent } from './resume-existing-application/money-borrowing/money-borrowing.component';
import { BusinessDurationComponent } from './resume-existing-application/business-duration/business-duration.component';
import { ScreeningProcessComponent } from './resume-existing-application/screening-process/screening-process.component';
import { ContactInfoComponent } from './resume-existing-application/contact-info/contact-info.component';
import { ResidentialAddressComponent } from './resume-existing-application/residential-address/residential-address.component';
import { BusinessAddressComponent } from './resume-existing-application/business-address/business-address.component';
import { ResumeProfileComponent } from './resume-existing-application/resume-profile/resume-myprofile.component';
import { BusinessInfoComponent } from './resume-existing-application/business-info/business-info.component';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent,
        children: [
            {
                path: '',
                component: StartScreenComponent,
            },
            {
                path: 'loan-purpose',
                component: LoanPurposeComponent,
            },
            {
                path: 'landing',
                component: LandingComponent,
            },
            {
                path: 'business',
                component: AboutBusinessComponent,
            },
            {
                path: 'applicant',
                component: AboutComponent,
            },
            {
                path: 'offer',
                component: CustomizeOfferComponent,
            },
            {
                path: 'review',
                component: ReviewComponent,
            },
            {
                path: 'reviewdata',
                component: ReviewdataComponent,
            },
            {
                path: 'myApp',
                component: ResumeApplicationComponent,
            },
            {
                path: 'resumeProfile',
                component: ResumeProfileComponent,
            },
            {
                path: 'moneyBorrowing',
                component: MoneyBorrowingComponent,
            },
            {
                path: 'businessInfo',
                component: BusinessInfoComponent,
            },
            {
                path: 'businessDuration',
                component: BusinessDurationComponent,
            },
            {
                path: 'screeningProcess',
                component: ScreeningProcessComponent,
            },
            {
                path: 'contactInfo',
                component: ContactInfoComponent,
            },
            {
                path: 'residentialAddress',
                component: ResidentialAddressComponent,
            },
            {
                path: 'businessAddress',
                component: BusinessAddressComponent,
            },
            {
                path: 'partner',
                component: AboutComponent,
                children: [
                    // This is a WILDCARD CATCH-ALL route that is scoped to the "/app/a"
                    // route prefix. It will only catch non-matching routes that live
                    // within this portion of the router tree.
                    {
                        path: '**',
                        component: AboutComponent
                    }
                ]
            },
            {
                path: 'thankyou',
                component: ThankYouComponent
            },
            {
                path: 'create-app',
                component: AboutComponent,
            },

            {
                path: 'redirect',
                component: RedirectComponent,
            }
        ]
    },
    {
        path: '404',
        component: ErrorPageComponent
    },
    {
        path: 'error/:type',
        component: ErrorPageComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule {
}
