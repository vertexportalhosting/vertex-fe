import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './guards/auth.guard';
import { PatientDetailsComponent } from './demo/components/cases/patient-details/patient-details.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: 'dashboard' ,loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'case', loadChildren: () => import('./demo/components/cases/cases.module').then(m => m.CasesModule) },
                    { path: 'doctor', loadChildren: () => import('./demo/components/user-management/user.module').then(m => m.UserModule) },
                    { path: 'activity', loadChildren: () => import('./demo/components/activity/activity.module').then(m => m.ActivityModule) },
                    { path: 'calendar', loadChildren: () => import('./demo/components/calendar/calendar.module').then(m => m.CalendarsModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'patient-details/:id', component: PatientDetailsComponent },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/dashboard' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
