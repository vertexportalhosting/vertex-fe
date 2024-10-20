import { Component } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
 events : any[] = [];
  constructor(){
    this.events = [
      { 
        status: 'Subcase Additional Comment',
        date: '15/10/2020 10:30',
        title : 'Order confirmation received for Order #12345.',
         icon: 'pi pi-fw pi-plus', color: '#8a8a8a', time: '3 days ago'
      },

      { 
        status: 'Subcase Created',
        date: '15/10/2020 14:00',
        title : 'Your appointment is scheduled for 20th October, 2024.',
        icon: 'pi pi-fw pi-plus', 
        color: '#8a8a8a', 
        time : '5 days ago' 
      },

      { 
        status: 'Patient Created',
        date: '15/10/2020 16:15',
        title : 'Payment of $250 has been successfully processed.',
        icon: 'pi pi-fw pi-plus',
        color: '#8a8a8a', 
        time :'9 days ago' 
      },
  ];
  }
}
