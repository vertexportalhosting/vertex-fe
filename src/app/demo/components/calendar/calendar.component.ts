import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, MOMENT } from 'angular-calendar';
import { Subject } from 'rxjs';
import { CaseControllerService } from 'src/app/api/services';

const colors: Record<string, any> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  public view: CalendarView = CalendarView.Month;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public modalData: {
      action: string;
      event: any;
  };
  public scheduledCampaigns: any;
  public marketingCampaigns: any;
  public fetchPolicy: string = 'no-cache';

  public actions: CalendarEventAction[] = [
      {
          label: '<i class="fas fa-fw fa-pencil-alt"></i>',
          a11yLabel: 'Edit',
          onClick: ({ event }: { event: any }): void => {
              this.handleEvent('Edited', event);
          },
      },
      {
          label: '<i class="fas fa-fw fa-trash-alt"></i>',
          a11yLabel: 'Delete',
          onClick: ({ event }: { event: any }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              this.handleEvent('Deleted', event);
          },
      },
      {
          label: '<i class="fas fa-fw fa-plus-alt"></i>',
          a11yLabel: 'Add',
          onClick: ({ event }: { event: any }): void => {
              this.handleEvent('Edited', event);
          },
      },
  ];
  public refresh = new Subject<void>();
  public events: any = [];
  public activeDayIsOpen: boolean = true;
  public scheduledEvents: any[] = []

  constructor(private caseService: CaseControllerService, private router: Router) { }

  ngOnInit(): void {
      this.getEvent();
  }

  dayClicked({ date, events }: { date: Date; events: any[] }): void {
    if (events.length) {
      this.router.navigate(['/case/list'], {
        queryParams: {
          delivery_date: JSON.stringify([
            new Date(new Date(date).setHours(0,0,0,0)),
            new Date(new Date(date).setHours(23,59,59,59))
          ])
        }
      });
    }
  }

  /**
   * sets the event on clicked date
   * @param date Date of the event
   */
  setEvent(event, date?, index?) {
  }



  /**
   * gets scheduled Events.
   */
  async getEvent() {
    const date = this.viewDate;
     await this.caseService.find({
      filter: JSON.stringify({
        where: {
          delivery_date: {
            between: [
              new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1), 
              new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0),
            ]
          },
          deleted: false,
        }
      })
     }).subscribe(b => {
      this.events = b.map(a => {
        return {
          start: new Date(a.delivery_date),
          title: a.patient_name,
          caseId: a.id,
          color: a.urgent ? {...colors['red']} : null
        }
       });
     });
  }

  /**
   * 
   * @param param0 
   */
  eventTimesChanged({
      event,
      newStart,
      newEnd,
  }: CalendarEventTimesChangedEvent): void {
      this.events = this.events.map((iEvent) => {
          if (iEvent === event) {
              return {
                  ...event,
                  start: newStart,
                  end: newEnd,
              };
          }
          return iEvent;
      });
      this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: any): void {
    if (action == 'Clicked') {
      this.router.navigate(['/case/view', event.caseId])
    }
  }

  /**
   * Add Calendar Event
   * @param newEvent 
   * @returns 
   */
  addEvent(newEvent): any {
      delete newEvent.meeting_guest
      delete newEvent.__typename
      if (newEvent.title) {
          this.events = [...this.events, newEvent];
      }
      if (newEvent.id) {
         
      }
      else {
          
      }
  }

  /**
   * delete calender Event by Id
   * @param meetingScheduleid 
   * @returns 
   */
  deleteEvent(meetingScheduleid: number): Promise<any> {
      return new Promise(resolve => {
      })

  }

  setView(view: CalendarView) {
      this.view = view;
  }

  /**
   *  gets month view Title.
   * @param date
   * @param locale
   * @returns curretnt month.
   */
  public monthViewTitle(date, locale): string {
      return formatDate(date, 'MMM ', locale);
  }

  closeOpenMonthViewDay(event: any) {
      this.activeDayIsOpen = false;
      this.getEvent();
  }
}
