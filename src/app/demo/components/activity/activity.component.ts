import { Component } from '@angular/core';
import { PatientHistory } from 'src/app/api/models';
import { PatientHistoryControllerService } from 'src/app/api/services';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrl: './activity.component.scss',
})
export class ActivityComponent {
    events: any[] = [];
    limit = 10;
    page = 0;
    total = 40;
    currentIndex: number = 0;
    constructor(private history: PatientHistoryControllerService) {}

    ngOnInit(): void {
        this.getHistories();
        this.getHistoriesCount();
    }

    getHistories() {
        const filter: any = {
            limit: this.limit,
            offset: this.limit * this.page,
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
                }
            });
    }
    getHistoriesCount() {
        this.history.count({}).subscribe((res) => {
            if (res) {
                this.total = res.count;
            }
        });
    }

    next(): void {
        if (this.limit < this.total) {
            this.currentIndex++;
            this.limit = this.limit * this.currentIndex;
            this.getHistories();
        }
    }

    previous(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.limit = this.limit * this.currentIndex;
            this.getHistories();
        }
    }
}
