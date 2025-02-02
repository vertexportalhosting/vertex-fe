import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, MOMENT } from 'angular-calendar';
import { Subject } from 'rxjs';
import { CaseControllerService } from 'src/app/api/services';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';



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
  styleUrl: './calendar.component.scss',
  providers: [DatePipe]
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
  public visible = false;
  public listEvents = [];
  caseTypes: any[] = [
    { name: 'Stage 0 - Pre-Surgery', code: '0' },
    { name: 'Stage 1 - Surgery', code: '1' },
    { name: 'Stage 2 - Prototype/ Try In', code: '2' },
    { name: 'Stage 3 - Final', code: '3' },
];

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

  constructor(private caseService: CaseControllerService, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
      this.getEvent();
  }

  dayClicked({ date, events }: { date: Date; events: any[] }): void {
    if (events.length) {
      this.visible = false;
      this.listEvents = events;
      this.visible = true;
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
              this.formatDate(new Date(new Date(date).getFullYear(), new Date(date).getMonth(), 1)), 
              this.formatDate(new Date(new Date(date).getFullYear(), new Date(date).getMonth() + 1, 0)),
            ]
          },
          deleted: false,
        },
        include: [
          {
            relation: 'scan',
            scope: {
              order: 'id DESC',
              limit: 1
            }
          }
        ]
      })
     }).subscribe(b => {
      this.events = b.map(a => {
        return {
          start: new Date(a.delivery_date),
          title: a.patient_name,
          caseId: a.id,
          latest: a?.scan && a.scan.length > 0 ? this.caseTypes.find(c => c.code == a?.scan[0]?.stage)?.name : null,
          color: a.urgent ? {...colors['red']} : null,
          urgent: a.urgent,
        }
       });
     });
  }

  viewAllForTheDay(date: string) {
    this.router.navigate(['/case/list'], {
      queryParams: {
        delivery_date: JSON.stringify([
          new Date(new Date(date).setHours(0,0,0,0)),
          new Date(new Date(date).setHours(23,59,59,59))
        ])
      }
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

  openDialog(ev) {
    this.listEvents = ev;
    this.visible = true;
  }

  generatePDF() {
    const event = this.events.sort((a,b) => a?.latest?.localeCompare(b?.latest))
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Name', 'Current Stage', 'Delivery Date']],
      body: event.map(patient => [patient.title, patient.latest, patient.urgent ? 'Urgent: ' + this.datePipe.transform(patient.start, 'fullDate')! : this.datePipe.transform(patient.start, 'fullDate')!]),
    });
    doc.save(this.datePipe.transform(this.events[0]?.start, 'MMMM YYYY')+'.pdf');
  }

  formatDate(date) {
    // add 0 if less than 10 to month and date
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  }
}
