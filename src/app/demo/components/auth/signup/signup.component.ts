import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { UserControllerService } from 'src/app/api/services';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    visible: boolean = true;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private userControllerService: UserControllerService
    ) {}

    public userForm: FormGroup;
    ngOnInit(): void {
        this.initializeUserForm();
    }

    initializeUserForm(): void {
        this.userForm = this.fb.group({
            username: ['', Validators.required],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(this.emailPattern),
                ],
            ],
            password: ['', Validators.required],
            role: ['Doctor'],
            active: [true, Validators.required],
        });
    }

    onSubmit() {
        if (this.userForm.invalid) return;
        this.userControllerService
            .signUp({ body: this.userForm.value })
            .subscribe(() => {
                this.router.navigate(['/auth/login']);
            });
    }
}
