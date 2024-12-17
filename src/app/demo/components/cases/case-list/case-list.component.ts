import { Location, ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { debounceTime, filter, fromEvent, take } from 'rxjs';
import { Case, CaseWithRelations } from 'src/app/api/models';
import {
    CaseControllerService,
    PatientControllerControllerService,
} from 'src/app/api/services';
import { StoreService } from 'src/app/demo/service/store.service';

@Component({
    selector: 'app-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class CaseListComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('dt1') dt1!: any;
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
    skipEntries = 0;
    searchFilter = '';
    currentUrl = '';
    limit = 20;
    page = 0;
    totalCount = 0;
    caseFields = ['case_type','notes', 'patient_name', 'doctor_name', 'delivery_date', 'case_status', 'id'];

    constructor(
        private patientController: PatientControllerControllerService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private caseController: CaseControllerService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private viewportScroller: ViewportScroller,
        private loader: StoreService
    ) {}

    ngOnInit() {
        this.activatedRoute?.queryParams?.subscribe((params) => {
            this.getUpdatedList(params);
        });
        this.currentUrl =
            JSON.parse(localStorage.getItem('patientFilters'))?.currentUrl ||
            '';
        this.skipEntries =
            JSON.parse(localStorage.getItem('patientFilters'))?.skipEntries ||
            0;
        this.searchFilter =
            JSON.parse(localStorage.getItem('patientFilters'))?.searchFilter ||
            '';
        if (this.currentUrl != this.router.url) {
            this.page = 0;
            localStorage.setItem(
                'patientFilters',
                JSON.stringify({
                    page: 0,
                    searchFilter: '',
                    currentUrl: this.router.url,
                })
            );
        }
    }

    getUpdatedList(params) {
        if (!params?.status) {
            this.getCaseList();
            return;
        }
        if (params.status === 'completed') {
            this.whereFilter.case_status = 'completed';
        } else if (params.status.startsWith('Stage')) {
            this.whereFilter.case_type = {
                like: `${params.status}%`,
            };
            this.whereFilter.or = [
                {
                    case_status: {
                        neq: 'completed',
                    },
                },
                {
                    case_status: {
                        eq: null,
                    },
                },
            ];
        }

        this.getCaseList();
    }

    getCaseList() {
        let where: any = {
            deleted: false,
            or: this.caseFields.map(field => {
                return {
                    [field] : {
                        like: "%"+this.searchFilter+"%"
                    }
                }
            })
        };
        this.page = JSON.parse(localStorage.getItem('patientFilters'))?.page || 0;
        this.admin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';
        if (!this.admin) {
            where = {
                ...where,
                userId: JSON.parse(localStorage.getItem('user'))?.id,
            };
        }
        if (this.whereFilter?.case_status || this.whereFilter?.case_type) {
            where = {
                ...where,
                ...this.whereFilter,
            };
        }
        const filter = {
            limit: this.limit,
            skip: this.limit * this.page,
            include: [
                {
                    relation: 'history',
                    scope: {
                        include: [
                            {
                                relation: 'user'
                            }
                        ],
                        order: 'id DESC',
                        limit: 1
                    },
                },
                {
                    relation: 'patient',
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
            order: ['updated_at DESC']
        };
        this.caseController.find({ filter: JSON.stringify(filter) }).subscribe(
            (data) => {
                const cases = data.map((item: any) => {
                    item.patient = item?.patient?.name;
                    item.user = item?.user?.username;
                    item.history = item?.history?.map((r: any) => {
                        r.by = r?.details?.toLowerCase().includes('update')
                        ? 'Updated'
                        : r?.details?.toLowerCase().includes('added')
                        ? 'Added'
                        : r?.details?.toLowerCase().includes('upload')
                        ? 'Uploaded'
                        : r?.details?.toLowerCase().includes('deleted')
                        ? 'Deleted'
                        : '';
                        return r;
                      });
                    return item;
                }) || [];
                this.cases = [...cases];
                this.loading = false;
                this.router.events.subscribe((e: any) => {
                    if (e instanceof Scroll && e.position) {
                        // backward navigation
                        const p: ScrollOptions = {};
                        setTimeout(() => {
                            window.scrollTo(...e.position);
                        }, 2000);
                    }
                });
            },
            (error) => {
                console.log('error: ', error);

                this.loader.hideLoader();
            }
        );
        this.caseController.count({where: JSON.stringify(where)}).subscribe((res) => this.totalCount = res.count)
    }

    onGlobalFilter() {
            this.getCaseList();
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

    updateCaseStatus(selectedCase, type) {
        const _case = { ...selectedCase };
        Object.keys(selectedCase).forEach((key) => {
            if (selectedCase[key] == null) {
                _case[key] = '';
            }
        });
        delete _case.user;
        delete _case.patient;
        delete _case.show;
        delete _case.history;
        if (_case.urgent == null || _case.urgent == '') {
            _case.urgent = false;
        }
        if (_case.deleted == null || _case.deleted == '') {
            _case.deleted = false;
        }
        _case.details =
            type == 'stage'
                ? 'Patient Stage has been updated to ' + selectedCase.case_type
                : 'Case Status has been updated to ' + selectedCase.case_status;
        _case.notify = true;
        this.caseController
            .updateCaseStageById({
                id: _case.id,
                body: {
                    ..._case,
                },
            })
            .subscribe();
        selectedCase.show = false;
    }

    clearFilters() {
        this.searchFilter = '';
        this.whereFilter = {};
        localStorage.setItem(
            'patientFilters',
            JSON.stringify({ page: 0, searchFilter: '' })
        );
        this.getCaseList();
    }

    onPageChange(event: any) {
        this.page = event.first / event.rows;
        localStorage.setItem(
            'patientFilters',
            JSON.stringify({
                page: this.page,
                searchFilter: this.searchFilter,
                currentUrl: this.router.url,
            })
        );
        this.getCaseList();
    }

    readCase(id) {
        this.caseController.updateCaseStatusById({
            id: id,
            body: {}
        }).subscribe(() =>  this.getCaseList())
    }

    ngOnDestroy(): void {
        localStorage.setItem(
            'patientFilters',
            JSON.stringify({
                page: this.page,
                searchFilter: this.searchFilter,
                currentUrl: this.currentUrl,
            })
        );
    }
}
