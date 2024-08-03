import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CaseManagementComponent } from './case-management/case-management.component';
import { CaseListComponent } from './case-list/case-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CaseViewComponent } from './case-view/case-view.component';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
        FileUploadModule,
        StepsModule,
        CardModule,
		ProgressBarModule,
        InputSwitchModule,
        CalendarModule,
		ToastModule,
        ConfirmDialogModule,
        CheckboxModule,
        InputTextareaModule,
        InputSwitchModule,
        CalendarModule,
        BlockUIModule,
        RadioButtonModule,
        ProgressSpinnerModule,
        DialogModule,
        RouterModule.forChild([
            { path: 'list', component: CaseListComponent },
            { path: 'add', component: CaseManagementComponent },
            { path: 'edit/:id', component: CaseManagementComponent },
            { path: 'view/:id', component: CaseViewComponent },
        ] as Routes)
    ],
    declarations: [
        CaseManagementComponent,
        CaseListComponent,
        CaseViewComponent
    ],
    providers: [
        ConfirmationService
    ],
    exports: [
        RouterModule
    ]
})
export class CasesModule { }
