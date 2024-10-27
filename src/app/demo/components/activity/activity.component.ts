import { Component } from '@angular/core';
import { PatientHistory } from 'src/app/api/models';
import { PatientHistoryControllerService } from 'src/app/api/services';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrl: './activity.component.scss',
})
export class ActivityComponent {
    events: any[] = [
        {
            status: 'Subcase Additional Comment',
            date: '15/10/2020 10:30',
            title: 'Order confirmation received for Order #12345.',
            icon: 'pi pi-fw pi-plus',
            color: '#8a8a8a',
            time: '3 days ago',
        },

        {
            status: 'Subcase Created',
            date: '15/10/2020 14:00',
            title: 'Your appointment is scheduled for 20th October, 2024.',
            icon: 'pi pi-fw pi-plus',
            color: '#8a8a8a',
            time: '5 days ago',
        },

        {
            status: 'Patient Created',
            date: '15/10/2020 16:15',
            title: 'Payment of $250 has been successfully processed.',
            icon: 'pi pi-fw pi-plus',
            color: '#8a8a8a',
            time: '9 days ago',
        },
    ];
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
        include: [
           {
            relation: 'user',
           },
           {
            relation: 'patient',
           },
           {
            relation: 'case',
           }
        ]
      }
      this.history.find({
        filter: JSON.stringify(filter)
      }).subscribe((res) => {
        if (res) {
          console.log('res: ', res);
          this.events = res;
        }
      })
    }
    getHistoriesCount() {
      this.history.count({
      }).subscribe((res) => {
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
