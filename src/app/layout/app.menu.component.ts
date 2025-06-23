import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                roles: ['admin', 'Doctor'],
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Patient Management',
                roles: ['admin', 'Doctor'],
                items: [
                    { label: 'Patient All Cases', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/list'] },
                    { label: 'Patient Closed Cases', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/listing'], queryParams: {status: 'completed'}},
                    { label: 'Patient Pre Surgery (Stage 0)', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/listing'], queryParams: {status: 'Stage 0'}},
                    { label: 'Patient Surgery (Stage 1)', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/listing'], queryParams: {status: 'Stage 1'}},
                    { label: 'Patient Prototype Try In (Stage 2)', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/listing'], queryParams: {status: 'Stage 2'}},
                    { label: 'Patient Final (Stage 3)', icon: 'pi pi-fw pi-briefcase', routerLink: ['/case/listing'], queryParams: {status: 'Stage 3'}},
                ]
            },
            {
                label: 'Doctor Management',
                roles: ['admin'],
                items: [
                    { label: 'Doctors', icon: 'pi pi-fw pi-briefcase', routerLink: ['/doctor/list'] }
                ]
            },
            {
                label: 'Recent Activity',
                roles: ['admin', 'Doctor'],
                items: [
                    { label: 'Activity', icon: 'pi pi-fw pi-bolt', routerLink: ['/activity'] }
                ]
            },
            {
                label: 'Activity Calendar',
                roles: ['admin'],
                items: [
                    { label: 'Calendar', icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'] }
                ]
            },
            {
                label: 'Newsletter',
                roles: ['admin'],
                items: [
                    { label: 'Create a Newsletter', icon: 'pi pi-fw pi-envelope', routerLink: ['/newsletter'] }
                ]
            }
        ];

        const role = JSON.parse(localStorage.getItem('user'))?.role;
        if(role) {
            this.model = this.model.filter((item) => item.roles?.includes(role));
        }
    }
}
