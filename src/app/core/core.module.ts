import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {MenuAsideDirective} from './directives/menu-aside.directive';
import {MenuAsideOffcanvasDirective} from './directives/menu-aside-offcanvas.directive';
import {MenuHorizontalOffcanvasDirective} from './directives/menu-horizontal-offcanvas.directive';
import {MenuHorizontalDirective} from './directives/menu-horizontal.directive';
import {ClipboardDirective} from './directives/clipboard.directive';
import {ScrollTopDirective} from './directives/scroll-top.directive';
import {HeaderDirective} from './directives/header.directive';
import {MenuAsideToggleDirective} from './directives/menu-aside-toggle.directive';
import {QuickSidebarOffcanvasDirective} from './directives/quick-sidebar-offcanvas.directive';
import {FirstLetterPipe} from './pipes/first-letter.pipe';
import {TimeElapsedPipe} from './pipes/time-elapsed.pipe';
import {QuickSearchDirective} from './directives/quick-search.directive';
import {JoinPipe} from './pipes/join.pipe';
import {GetObjectPipe} from './pipes/get-object.pipe';
import {ConsoleLogPipe} from './pipes/console-log.pipe';
import {SafePipe} from './pipes/safe.pipe';
import {ReplaceStringPipe} from './pipes/replace-string.pipe';
import {PortletDirective} from './directives/portlet.directive';
import {GooglePlacesDirective} from './directives/google-places.directive';
import {PhoneMaskDirective} from './directives/phone-mask.directive';
import {SSNMaskDirective} from './directives/ssn-mask.directive';

import {DateMaskDirective} from './directives/date-mask.directive';
import {DOBValidatorDirective} from './directives/dob-validator.directive';
import {AlphabetDirective} from './directives/alphabet-only.directive';
import {ValidateDateDirective} from '@core/validator/date-validator.directive';
import {CurrencyPipe} from '@core/pipes/currency.pipe';
import {DateFormateDirective} from '@core/directives/dateformat-only.directive';
import {SubmitIfValidDirective} from '@core/directives/submit.directive';
import {DatePickerModule} from '@core/adapter/DatePickerModule';
import {CustomMinMaxValidatorDirective} from '@core/validator/min-max-validator.directive';
import {SalaryValidatorDirective} from '@core/validator/salary-validator.directive';
import {CurrenyFormatDirective} from '@core/directives/curreny-format.directive';
import {NumberDirective} from '@core/directives/numbers-only.directive';
import {VinCheckValidatorDirective} from '@core/validator/vin-check-validator.directive';
import {InputNumberDirective} from '@core/directives/input-number.directive';
import {ApplicationCodesDescription} from '@core/pipes/app-codes-desc.pipe';
import {CountyByzipcodeDirective} from '@core/directives/county-byzipcode.directive';
import {UppercaseDirective} from '@core/directives/uppercase.directive';
import { EinMarkDirective } from './directives/ein-mark.directive';
import {AlphabetNumberDirective} from './directives/alphabet-numbers-only.directive';
import { UsdOnlyDirective } from './directives/usd-only.directive';
import { TextCountDirective } from './directives/character-restrict.directive';
import { ClickColorDirective } from './directives/selected-dv-color.directive';
import { FileDragNDropDirective } from './directives/drag-drop.directive';

@NgModule({
    imports: [CommonModule, DatePickerModule],
    declarations: [
        // directives
        MenuAsideDirective,
        MenuAsideOffcanvasDirective,
        MenuHorizontalOffcanvasDirective,
        MenuHorizontalDirective,
        ScrollTopDirective,
        HeaderDirective,
        MenuAsideToggleDirective,
        QuickSidebarOffcanvasDirective,
        QuickSearchDirective,
        ClipboardDirective,
        PortletDirective,
        GooglePlacesDirective,
        NumberDirective,
        PhoneMaskDirective,
        SSNMaskDirective,
        EinMarkDirective,
        UsdOnlyDirective,
        DateMaskDirective,
        FileDragNDropDirective,
        DOBValidatorDirective,
        AlphabetDirective,
        ValidateDateDirective,
        SubmitIfValidDirective,
        InputNumberDirective,
        CurrenyFormatDirective,
        DateFormateDirective,
        CustomMinMaxValidatorDirective,
        SalaryValidatorDirective,
        VinCheckValidatorDirective,
        CountyByzipcodeDirective,
        ValidateDateDirective,
        UppercaseDirective,
        TextCountDirective,
        ClickColorDirective,
        // pipes
        FirstLetterPipe,
        TimeElapsedPipe,
        JoinPipe,
        GetObjectPipe,
        ConsoleLogPipe,
        SafePipe,
        CurrencyPipe,
        ReplaceStringPipe,
        ApplicationCodesDescription,
        AlphabetNumberDirective
    ],
    exports: [
        // directives
        MenuAsideDirective,
        MenuAsideOffcanvasDirective,
        MenuHorizontalOffcanvasDirective,
        MenuHorizontalDirective,
        ScrollTopDirective,
        HeaderDirective,
        MenuAsideToggleDirective,
        QuickSidebarOffcanvasDirective,
        QuickSearchDirective,
        ClipboardDirective,
        PortletDirective,
        GooglePlacesDirective,
        CurrenyFormatDirective,
        NumberDirective,
        PhoneMaskDirective,
        SSNMaskDirective,
        EinMarkDirective,
        UsdOnlyDirective,
        DateMaskDirective,
        FileDragNDropDirective,
        DOBValidatorDirective,
        AlphabetDirective,
        ValidateDateDirective,
        SubmitIfValidDirective,
        InputNumberDirective,
        CustomMinMaxValidatorDirective,
        CountyByzipcodeDirective,
        SalaryValidatorDirective,
        VinCheckValidatorDirective,
        ValidateDateDirective,
        UppercaseDirective,
        TextCountDirective,
        ClickColorDirective,
        // pipes
        FirstLetterPipe,
        TimeElapsedPipe,
        JoinPipe,
        GetObjectPipe,
        ConsoleLogPipe,
        SafePipe,
        ApplicationCodesDescription,
        ReplaceStringPipe,
        AlphabetNumberDirective
    ],
    providers: [ DecimalPipe,
        CurrencyPipe]
})
export class CoreModule {
}

