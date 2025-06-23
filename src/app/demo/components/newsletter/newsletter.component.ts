import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { UserControllerService } from 'src/app/api/services';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrl: './newsletter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsletterComponent {
    editor: Editor;
    title: string = 'Newsletter';
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    form = new FormGroup({
        editorContent: new FormControl(
            { value: '', disabled: false },
            Validators.required()
        ),
    });

    constructor(private userControllerService: UserControllerService) {}

    get doc(): AbstractControl {
        return this.form.get('editorContent');
    }

    ngOnInit(): void {
        this.editor = new Editor();
    }

    sendEmails(): void {
        if (this.form.valid) {
            const content = this.doc.value;
            this.userControllerService
                .sendNewsLetter({
                    body: {
                        content: content,
                        data: { title: this.title },
                    },
                })
                .subscribe({
                    next: (response) => {
                        this.form.reset();
                    },
                    error: (error) => {
                        console.error('Error sending newsletter:', error);
                    },
                });
        } else {
            console.error('Form is invalid');
        }
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
