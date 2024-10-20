import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ActivityComponent } from './activity.component';
import { TimelineModule } from 'primeng/timeline';
import { ConfirmationService } from 'primeng/api';



@NgModule({
  imports: [
    CommonModule,
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
    TimelineModule,
    RouterModule.forChild([
        { path: 'list', component: ActivityComponent },
    ] as Routes)
  ],
  declarations: [
   ActivityComponent
],
providers: [
    ConfirmationService
],
exports: [
    RouterModule
]
})
export class ActivityModule { }
