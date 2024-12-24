import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PatientHistory } from 'src/app/api/models';
import { CaseControllerService, PatientHistoryControllerService } from 'src/app/api/services';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrl: './activity.component.scss',
})
export class ActivityComponent {
    events: any[] = [];
    limit = 10;
    page = 0;
    offset = 0;
    total = 40;
    currentIndex: number = 0;

    @Input() caseId;
    constructor(private history: PatientHistoryControllerService, private cases: CaseControllerService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getHistories();
        this.getHistoriesCount();
    }

    async getHistories() {
        const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
        const filter: any = {
            limit: this.limit,
            offset: this.offset,
            order: ['id desc'],
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
        if (this.caseId) {
            filter['where'] = {
                caseId: this.caseId
            }
        }

        if (role === 'Doctor') {
            const cases: any = await this.cases.find({
                filter: JSON.stringify({
                    where: {
                        userId: id
                    }
                })
            }).toPromise();
            filter['where'] = {
                ...filter.where,
                caseId: {
                    inq: cases.map(cases => cases.id)
                }
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
    getHistoriesCount() {
        const { role, id } = JSON.parse(localStorage.getItem('user')) || {};
        let where;
        if (this.caseId) {
            where = {
                caseId: this.caseId
            }
        }
        if (role === 'Doctor') {
            where = {
                ...where,
                userId: id
            }
        }
        this.history.count({
            where: JSON.stringify(where)
        }).subscribe((res) => {
            if (res) {
                this.total = res.count;
            }
        });
    }

    next(): void {
        if (this.limit < this.total) {
            this.currentIndex++;
            this.offset = this.limit * this.currentIndex;
            this.getHistories();
        }
    }

    previous(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.offset = this.limit * this.currentIndex;
            this.getHistories();
        }
    }
}
