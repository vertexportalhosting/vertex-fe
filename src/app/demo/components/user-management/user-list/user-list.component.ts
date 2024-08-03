
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserControllerService } from 'src/app/api/services/user-controller.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class UserListComponent implements OnInit {
  editMode: boolean = false;
  visible: boolean = false;
  doctorForm: FormGroup;
  doctorId: string;
  doctorList: any[] = [];
  emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private userControllerService: UserControllerService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.initializeDoctorForm();
    this.getAllDoctors();
  }

  getAllDoctors() {
    this.userControllerService.findAllUsers().subscribe({
      next: (res) => {
        this.doctorList = res.filter(doc => doc.role !== 'admin');
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch doctors' });
      }
    });
  }

  initializeDoctorForm() {
    this.doctorForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
      role: ['Doctor'],
      active: [false, Validators.required]
    });
  }

  showDialog(data?: any) {
    this.visible = true;
    this.editMode = !!data;
    if (data) {
      this.doctorId = data.id;
      this.doctorForm.patchValue(data);
    } else {
      this.initializeDoctorForm();
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  onSubmit() {
    let request: Observable<any> = this.editMode ? this.userControllerService.updateUserById({ id: this.doctorId, body: { ...this.doctorForm.value } })
      : this.userControllerService.signUp({ body: this.doctorForm.value });

    request.subscribe({
      next: () => {
        this.getAllDoctors();
        
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Call Failed' });
      }
    });
    this.visible = false;
    this.doctorForm.reset();
  }

  activeCheck(event: any) {
    this.doctorForm.get('active')?.setValue(event.checked);
  }

  deleteDoctorById(id: string) {
    this.userControllerService.deleteUserById({ id }).subscribe({
      next: () => {
        this.doctorList = this.doctorList.filter(doctor => doctor.id !== id);
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete record' });
      }
    });
  }

  confirmDeletion(event: Event, deletedDataId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteDoctorById(deletedDataId),
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  trackByDoctorId(index: number, doctor: any): string {
    return doctor.id;
  }
}
