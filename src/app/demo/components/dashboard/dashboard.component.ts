import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { Subscription} from 'rxjs';
import {
    CaseControllerService,
    PatientHistoryControllerService,
} from 'src/app/api/services';
import { StoreService } from '../../service/store.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
    subscription!: Subscription;
    events: any[] = [];
    totalCase = 0;
    casesClosed = 0;
    stage0 = 0;
    stage1 = 0;
    stage2 = 0;
    stage3 = 0;

    constructor(
        private caseController: CaseControllerService,
        private store: StoreService,
        private history: PatientHistoryControllerService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        setTimeout(() => {
            const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
            this.getCasesCount(role, id);
            this.getHistories();
        }, 1000);
    }

    getCasesCount(role, id) {
        let filter: any = {};
        if (role == 'admin') {
            filter = {
                where: {
                    deleted: false,
                },
                fields: {
                    case_type: true,
                    case_status: true,
                },
            };
        } else {
            filter = {
                where: {
                    deleted: false,
                    userId: id,
                },
            };
        }

        this.caseController
            .find({
                filter: JSON.stringify(filter),
            })
            .subscribe((res) => {
                this.totalCase = res.length;
                this.casesClosed = res.filter(
                    (res) => res.case_status === 'completed'
                )?.length;
                this.stage0 = res.filter(
                    (res) =>
                        res.case_type.startsWith('Stage 0') &&
                        res.case_status != 'completed'
                )?.length;
                this.stage1 = res.filter(
                    (res) =>
                        res.case_type.startsWith('Stage 1') &&
                        res.case_status != 'completed'
                )?.length;
                this.stage2 = res.filter(
                    (res) =>
                        res.case_type.startsWith('Stage 2') &&
                        res.case_status != 'completed'
                )?.length;
                this.stage3 = res.filter(
                    (res) =>
                        res.case_type.startsWith('Stage 3') &&
                        res.case_status != 'completed'
                )?.length;
            });
    }
    getHistories() {
        const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
        const filter: any = {
            limit: 50,
            offset: 0,
            order: ['id DESC'],
            include: [
                {
                    relation: 'user',
                },
                {
                    relation: 'patient',
                },
                {
                    relation: 'case',
                },
            ],
        };
        if (role === 'Doctor') {
            filter['where'] = {
                ...filter['where'],
                userId: id
            }
        }
        this.history
            .find({
                filter: JSON.stringify(filter),
            })
            .subscribe((res) => {
                if (res) {
                    res.forEach((r: any) => {
                        r.action = r?.details?.toLowerCase().includes('update')
                            ? 'Updated'
                            : r?.details?.toLowerCase().includes('added')
                            ? 'Added'
                            : r?.details?.toLowerCase().includes('upload')
                            ? 'Uploaded'
                            : r?.details?.toLowerCase().includes('deleted')
                            ? 'Deleted'
                            : '';
                    });
                    this.events = res;
                    this.cdr.detectChanges();
                }
            });
    }

    openHistroyDetail() {}

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
