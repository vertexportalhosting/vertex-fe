import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Case } from 'src/app/api/models';
import { CaseControllerService } from 'src/app/api/services';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    totalCase = 0;
    casesClosed = 0;
    stage0 = 0;
    stage1 = 0;
    stage2 = 0;
    stage3 = 0;
    constructor(private caseController: CaseControllerService) {}

    ngOnInit() {
        setTimeout(() => {
            const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
            this.getCasesCount(role, id);
        }, 1000);
    }

    getCasesCount(role, id) {
        let filter: any = {};
        if (role == 'admin') {
            filter = {
                where: {},
                fields: {
                    case_type: true,
                    case_status: true,
                },
            };
        } else {
            filter = {
                where: {
                    userId: id,
                },
            };
        }

        this.caseController
            .find({
                filter: JSON.stringify(filter),
            })
            .subscribe(res => {
                this.totalCase = res.length;
                this.casesClosed = res.filter(res => res.case_status === 'completed')?.length;
                this.stage0 = res.filter(res => res.case_type.startsWith('Stage 0') && res.case_status != 'completed')?.length;
                this.stage1 = res.filter(res => res.case_type.startsWith('Stage 1') && res.case_status != 'completed')?.length;
                this.stage2 = res.filter(res => res.case_type.startsWith('Stage 2') && res.case_status != 'completed')?.length;
                this.stage3 = res.filter(res => res.case_type.startsWith('Stage 3') && res.case_status != 'completed')?.length;
            })
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
