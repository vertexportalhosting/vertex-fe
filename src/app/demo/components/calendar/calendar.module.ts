import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: CalendarComponent },
        ] as Routes),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ],
    declarations: [
        CalendarComponent,
    ],
    providers: [
    ],
    exports: [
        RouterModule
    ]
})
export class CalendarsModule { }
