import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserControllerService } from 'src/app/api/services';
import { catchError, tap } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    constructor(public layoutService: LayoutService, private fb: FormBuilder, private router: Router, private userControllerService: UserControllerService, private route: ActivatedRoute) { }
    visible: boolean = false;

    public userForm: FormGroup;
    ngOnInit(): void {
        this.initializeUserForm();
        this.visible = true;
    }

    initializeUserForm(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.userForm.invalid) return;
        this.userControllerService.login({ body: this.userForm.value }).pipe(tap((data) => {
            if (data.token && data['role']) {
                localStorage.setItem("user", JSON.stringify(data));
                const returnUrl = this.route.snapshot.queryParams['returnUrl'];
                if (returnUrl) {
                    this.router.navigate(["/case/view/164"])
                } else {
                    this.isDevice() ? this.router.navigate(["/case/list"]) : this.router.navigate(["/dashboard"]);
                }
            }
        })
            , tap(() => {
                this.userControllerService.whoAmI().subscribe((data: any) => {
                    const user = JSON.parse(localStorage.getItem("user")) || {};
                    localStorage.setItem("user", JSON.stringify({ ...user, ...data }))
                });
            })
            , catchError((err: any) => {
                alert('Invalid Credentials');
                localStorage.clear();
                throw err;
            })).subscribe();
    }

    isDevice() {
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(navigator.userAgent);
    }

}
