import { NgModule } from '@angular/core';
import {
    GestureConfig,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
const MaterialComponents = [
    MatTabsModule, MatDividerModule, MatSliderModule, MatSelectModule,            MatRadioModule,  MatNativeDateModule,
        MatDatepickerModule, MatSnackBarModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatButtonModule,
        MatSortModule, MatTableModule, MatTabsModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule,
        MatProgressSpinnerModule, MatInputModule, MatPaginatorModule,
        MatChipsModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatExpansionModule,
        MatStepperModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatProgressButtonsModule,
        MatStepperModule
];
@NgModule({

    imports: [ MaterialComponents],
    exports: [ MaterialComponents],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: GestureConfig
        }
    ]
})
export class MyMaterialModule {
}
