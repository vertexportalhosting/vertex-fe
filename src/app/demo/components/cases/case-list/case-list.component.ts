import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Case, CaseWithRelations } from 'src/app/api/models';
import {
    CaseControllerService,
    PatientControllerControllerService,
} from 'src/app/api/services';

@Component({
    selector: 'app-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class CaseListComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    cases: Case[] = [];
    selectedCases: Case[] = [];
    loading: boolean = true;
    admin = false;
    case_status: any = [
        {
            label: 'Recieved',
            value: 'recieved',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
    ];
    caseTypes: any[] = [
        { name: 'Stage 0 - Pre-Surgery', code: '0' },
        { name: 'Stage 1 - Surgery', code: '1' },
        { name: 'Stage 2 - Prototype/ Try In', code: '2' },
        { name: 'Stage 3 - Final', code: '3' },
    ];
    whereFilter: any = {};

    constructor(
        private patientController: PatientControllerControllerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private caseController: CaseControllerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        const params: any = this.activatedRoute.snapshot.queryParams;
        switch (params?.status) {
            case 'completed':
                this.whereFilter = {
                    case_status: 'completed',
                };
                break;
            case 'Stage 0':
                this.whereFilter = {
                    case_type: {
                        like: 'Stage 0%'
                    },
                };
                break;
            case 'Stage 1':
                this.whereFilter = {
                    case_type: {
                        like: 'Stage 1%'
                    },
                };
                break;
            case 'Stage 2':
                this.whereFilter = {
                    case_type: {
                        like: 'Stage 2%'
                    },
                };
                break;
            case 'Stage 3':
                this.whereFilter = {
                    case_type: {
                        like: 'Stage 3%'
                    },
                };
                break;

            default:
                break;
        }
        this.getCaseList();
    }

    getCaseList() {
        let where: any = {};
        this.admin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';
        if (!this.admin) {
            where = {
                userId: JSON.parse(localStorage.getItem('user'))?.id,
            };
        }
        if (this.whereFilter?.case_status || this.whereFilter?.case_type) {
            where = {
                ...where,
                ...this.whereFilter
            }
        }
        const filter = {
            include: [
                {
                    relation: 'patient',
                    include: [{ relation: 'scan' }],
                },
                {
                    relation: 'user',
                    scope: {
                        fields: {
                            password: false,
                        },
                    },
                },
            ],
            where,
        };
        this.caseController
            .find({ filter: JSON.stringify(filter) })
            .subscribe((data) => {
                this.cases = data.map((item: any) => {
                    item.patient = item.patient.name;
                    item.user = item.user.username;
                    return item;
                });
                this.loading = false;
            });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    confirmDeleteCase(_case: CaseWithRelations) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this case?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCase(_case);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'You have cancelled',
                });
            },
        });
    }

    deleteCase(_case: CaseWithRelations) {
        this.caseController.deleteById({ id: _case.id }).subscribe({
            next: (res) => {
                const currentIndex = this.cases.findIndex(
                    (x) => x.id == _case.id
                );
                this.cases.splice(currentIndex, 1);
                this.patientController
                    .deleteById({
                        id: _case.patient.id,
                    })
                    .subscribe();
            },
        });
    }

    cancelDelete() {
        this.messageService.clear('confirmDelete');
    }

    getCaseStatus(status) {
        return (
            this.case_status.find((a) => a.value == status)?.label ||
            'In Progress'
        );
    }

    updateCaseStatus(selectedCase) {
        const _case = { ...selectedCase };
        Object.keys(selectedCase).forEach((key) => {
            if (selectedCase[key] == null) {
                _case[key] = '';
            }
        });
        delete _case.user;
        delete _case.patient;
        delete _case.show;
        if (_case.urgent == null || _case.urgent == '') {
            _case.urgent = false;
        }
        if (_case.deleted == null || _case.deleted == '') {
            _case.deleted = false;
        }
        this.caseController
            .updateById({
                id: _case.id,
                body: {
                    ..._case,
                },
            })
            .subscribe();
        selectedCase.show = false;
    }

    clearFilters() {
        this.whereFilter = {};
        this.getCaseList()
    }
}
