import { NgModule } from '@angular/core';
import { NewsletterComponent } from './newsletter.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxEditorModule } from "ngx-editor";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [NewsletterComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild([{ path: '', component: NewsletterComponent }]),
        NgxEditorModule,
        ButtonModule,
        InputTextModule
    ],
    exports: [],
})
export class NewsletterModule {}
