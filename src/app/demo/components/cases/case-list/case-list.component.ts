import { Location, ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { filter } from 'rxjs';
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
            this.skipEntries = 0;
            localStorage.setItem(
                'patientFilters',
                JSON.stringify({
                    skipEntries: 0,
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
        };
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
        this.caseController.find({ filter: JSON.stringify(filter) }).subscribe(
            (data) => {
                this.cases = data.map((item: any) => {
                    item.patient = item.patient.name;
                    item.user = item.user.username;
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
                this.loading = false;
                this.dt1.filterGlobal(this.searchFilter, 'contains');
                this.skipEntries = 0;
                setTimeout(() => {
                    this.skipEntries =
                        JSON.parse(localStorage.getItem('patientFilters'))
                            ?.skipEntries || 0;
                }, 500);
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
    }

    onGlobalFilter(table: Table, event: Event) {
        this.searchFilter = (event.target as HTMLInputElement).value;
        table.filterGlobal(this.searchFilter, 'contains');
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
            JSON.stringify({ skipEntries: 0, searchFilter: '' })
        );
        this.getCaseList();
    }

    onPageChange(event: any) {
        this.skipEntries = event.first;
        const skipEntries = this.skipEntries;
        localStorage.setItem(
            'patientFilters',
            JSON.stringify({
                skipEntries,
                searchFilter: this.searchFilter,
                currentUrl: this.router.url,
            })
        );
    }

    ngOnDestroy(): void {
        // const skipEntries = this.router.url.includes('/case/view')
        //     ? this.skipEntries
        //     : 0;
        const skipEntries = this.skipEntries;
        localStorage.setItem(
            'patientFilters',
            JSON.stringify({
                skipEntries,
                searchFilter: this.searchFilter,
                currentUrl: this.currentUrl,
            })
        );
    }
}
