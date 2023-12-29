import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatIconModule, MatProgressBarModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from '@customer/layout/header/header.component';
import {TopbarComponent} from '@customer/layout/header/topbar/topbar.component';
import {BrandComponent} from '@customer/layout/header/brand/brand.component';
import {FooterComponent} from '@customer/layout/footer/footer.component';
import {CoreModule} from '@core/core.module';
import {MenuHorizontalComponent} from '@customer/layout/header/menu-horizontal/menu-horizontal.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    // suppressScrollX: true
};

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        BrandComponent,
        MenuHorizontalComponent,
        // topbar components
        TopbarComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BrandComponent,
        MenuHorizontalComponent,
        // topbar components
        TopbarComponent
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoreModule,
        PerfectScrollbarModule,
        NgbModule,
        FormsModule,
        MatProgressBarModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        TranslateModule.forChild(),
        LoadingBarModule.forRoot(),
    ]
})
export class LayoutModule {
}
