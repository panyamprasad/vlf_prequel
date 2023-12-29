import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../../../../core/core.module';
import {MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {PortletComponent} from './portlet.component';

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ],
    declarations: [PortletComponent],
    exports: [PortletComponent]
})
export class PortletModule {
}
