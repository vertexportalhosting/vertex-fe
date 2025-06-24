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
    title: string = '';
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
    emails: any[] = [];
    selectedEmails = [];
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
        this.getDoctorsEmails();
    }

    getDoctorsEmails() {
        this.userControllerService.exportDoctorsEmails().subscribe({
            next: (emails) => {
                this.emails = emails.map((email) => ({
                    name: email,
                    value: email,
                }));
            },
        });
    }

    sendEmails(): void {
        if (this.form.valid) {
            if (!this.selectedEmails?.length) {
                alert('Please select emails to send newsletter');
                return;
            }
            const content = this.doc.value;
            this.userControllerService
                .sendNewsLetter({
                    body: {
                        content: content,
                        data: {
                            title: this.title,
                            emails: this.selectedEmails,
                        },
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
            alert('Please add title or content')
            console.error('Form is invalid');
        }
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
