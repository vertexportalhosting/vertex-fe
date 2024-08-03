import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import {AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
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
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
        CheckboxModule,
        InputTextareaModule,
        RouterModule.forChild([
            { path: 'list', component: UserListComponent },
            { path: 'add', component: AddUserComponent },
            { path: 'edit/:id', component: AddUserComponent },
        ] as Routes),
        DialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule
    ],
    declarations: [
        AddUserComponent,
        UserListComponent
    ],
    exports: [
        RouterModule
    ]
})
export class UserModule { }
