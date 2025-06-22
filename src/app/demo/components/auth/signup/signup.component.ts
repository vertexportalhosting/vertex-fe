import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
    step = 1;
    otpToVerify: string = '';
    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

    constructor(
        public layoutService: LayoutService,
        private fb: FormBuilder,
        private router: Router,
        private userControllerService: UserControllerService,
        private http: HttpClient
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
            otp: [''],
        });
    }

    onSubmit() {
        if (this.userForm.invalid) return;
        if (this.step === 1) {
            this.step = 2;
            this.userControllerService
                .authenticateSignUp({
                    body: this.userForm.value,
                })
                .subscribe((res) => {
                    this.otpToVerify = res as any;
                });
            return;
        } else if (
            this.step === 2 &&
            this.otpToVerify == this.userForm.value.otp
        ) {
            const { otp, ...userData } = this.userForm.value;
            this.userControllerService
                .signUp({ body: userData })
                .subscribe(() => {
                    this.router.navigate(['/auth/login']);
                });
        } else {
            alert('Invalid OTP'); 
        }
    }
}
