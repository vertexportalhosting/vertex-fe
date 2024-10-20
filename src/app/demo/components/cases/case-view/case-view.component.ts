import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import {
    Case,
    CaseWithRelations,
    Patient,
    Scan,
    User,
} from 'src/app/api/models';
import {
    CaseControllerService,
    ScanControllerService,
} from 'src/app/api/services';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { PatientControllerControllerService } from 'src/app/api/services';
import { StoreService } from 'src/app/demo/service/store.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
declare var Dropzone

@Component({
    selector: 'app-case-view',
    templateUrl: './case-view.component.html',
    styleUrl: './case-view.component.scss',
    providers: [MessageService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseViewComponent {
    patient: Patient | any = {};
    case: CaseWithRelations = {};
    user: User | any = {};
    scans: Scan[] | any = [];
    currentUser = JSON.parse(localStorage.getItem('user'));
    patientDialog = false;
    caseDialog = false;
    caseId: number;
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('fileUploader') fileUploader;
    caseTypes: any[] = [
        { name: 'Stage 0 - Pre-Surgery', code: '0' },
        { name: 'Stage 1 - Surgery', code: '1' },
        { name: 'Stage 2 - Prototype/ Try In', code: '2' },
        { name: 'Stage 3 - Final', code: '3' },
    ];
    admin = JSON.parse(localStorage.getItem('user'))?.role == 'admin';
    doctorScans = [];
    adminScans = [];
    isDarkTheme = false;
    uploadedFiles: any[] = [];
    uploadSide = 1;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private caseController: CaseControllerService,
        private patientController: PatientControllerControllerService,
        private scanController: ScanControllerService,
        private http: HttpClient,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public location: Location,
        private loader: StoreService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.loading = true;
        this.caseId = this.route.snapshot.params['id'];
        if (this.caseId) {
            this.getCaseInfo(this.caseId);
        }
        this.isDarkTheme = JSON.parse(localStorage.getItem('theme_config'))?.colorScheme == 'dark';
    }

    ngAfterViewInit() {
        this.initDropzone(1);
        this.initDropzone(2);
    }

    getCaseInfo(case_id: number) {
        const filter = {
            include: [
                {
                    relation: 'patient',
                },
                {
                    relation: 'user',
                },
                {
                    relation: 'scan',
                    order: 'id DESC',
                    scope: {
                        include: [
                            {
                                relation: 'user',
                            },
                        ],
                    },
                },
            ],
        };
        this.scans = [];
        this.patient = {};
        this.case = {};
        this.user = {};
        this.caseController
            .findById({ id: case_id, filter: JSON.stringify(filter) })
            .subscribe((data: any) => {
                this.uploadedFiles = [];
                data.delivery_date = new Date(data.delivery_date);
                this.scans = data.scan || [];
                this.patient = data.patient;
                this.case = data;
                this.user = data.user;
                this.adminScans = this.scans.filter(
                    (scan) => scan.user.role == 'admin'
                );
                this.doctorScans = this.admin
                    ? this.scans.filter((scan) => scan.user.role != 'admin')
                    : this.scans;
                    this.loading = false;
                    this.cdr.detectChanges();
            });
    }

    showCaseDialog() {
        this.caseDialog = true;
    }

    showPatientDialog() {
        this.patientDialog = true;
    }

    saveCase() {
        if (this.case.case_type && this.case.delivery_date) {
            const updated_case = {
                userId: this.case.userId,
                notes: this.case.notes,
                case_type: this.case.case_type,
                deleted: this.case.deleted || false,
                delivery_date: this.case.delivery_date,
                urgent: this.case.urgent || false,
                id: this.case.id,
            };
            let request: Observable<any> = this.caseController.updateById({
                id: this.caseId,
                body: updated_case,
            });

            request.subscribe({
                next: () => {
                    this.caseDialog = false;
                },
                error: (err) => {
                    console.log('err: ', err);
                },
            });
        } else {
        }
    }

    savePatient() {
        // Validate and save patient details
        if (this.case.patient.name) {
            this.patient.deleted = false;
            this.patient.gender = this.patient.gender || '';
            let request: Observable<any> = this.patientController.updateById({
                id: this.patient.id,
                body: this.patient,
            });

            request.subscribe({
                next: () => {
                    this.caseDialog = false;
                },
                error: (err) => {
                    console.log('err: ', err);
                },
            });
            this.patientDialog = false;
        } else {
        }
    }

    triggerFileInput() {
        this.fileInput.nativeElement.click();
    }

    onFileSelected(files) {
        this.loading = true;
        const uploadPromises = files.map((file) => {
            const formData = new FormData();
            formData.append('file', file);
            if (file) {
                return this.http
                    .post('https://vertex-be.onrender.com/upload', formData)
                    .toPromise()
                    .then(async (url: any) => {
                        if (url.imageUrl) {
                            await this.scanController
                                .create({
                                    body: {
                                        filename: file.name,
                                        url: url.imageUrl,
                                        uploadDate: new Date(),
                                        userId: this.uploadSide == 1 ? this.case.userId : JSON.parse(
                                            localStorage.getItem('user')
                                        )?.id,
                                        patientId: this.patient.id,
                                        caseId: this.case.id,
                                    } as any,
                                }).toPromise();
                        }
                    });
            } else {
                return Promise.resolve(); // If no file, resolve immediately
            }
        });
        return Promise.all(uploadPromises)
    }

    // onFileSelect(event) {
    //     this.loader.showLoader();
    //     const file = event.files[0];
    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('file', file);
    //         this.http
    //             .post('https://vertex-be.onrender.com/upload', formData)
    //             .toPromise()
    //             .then((url: any) => {
    //                 if (url.imageUrl) {
    //                     // this.scans.push();
    //                     this.scanController
    //                         .create({
    //                             body: {
    //                                 filename: file.filename,
    //                                 url: url.imageUrl,
    //                                 uploadDate: new Date(),
    //                                 userId: JSON.parse(
    //                                     localStorage.getItem('user')
    //                                 )?.id,
    //                                 patientId: this.patient.id,
    //                                 caseId: this.case.id,
    //                             } as any,
    //                         })
    //                         .subscribe(
    //                             () => {
    //                                 this.getCaseInfo(this.case.id);
    //                                 this.loader.hideLoader();
    //                                 this.fileUploader.clear();
    //                             },
    //                             (error) => {
    //                                 this.loader.hideLoader();
    //                                 this.fileUploader.clear();
    //                             }
    //                         );
    //                 }
    //             });
    //         // Reset the file input
    //         this.fileInput.nativeElement.value = '';
    //     }
    // }

    uploadNewScan() {}

    downloadScan(scan) {
        // Open the scan download URL in a new window
        // window.open(url, '_blank');
        this.http.get(scan.url, { responseType: 'blob' }).subscribe(
            (blob) => {
                const link = document.createElement('a');
                const url = window.URL.createObjectURL(blob);
                link.href = url;
                link.download = this.getFilename(scan);
                link.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                console.error('Download error:', error);
            }
        );
    }

    deleteScan(_scan) {
        this.cdr.detectChanges();
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this scan?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'scan',
            accept: () => {
                this.scanController.deleteById({ id: _scan.id }).subscribe({
                    next: () => {
                        this.getCaseInfo(this.case.id);
                    },
                    error: () => {},
                });
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

    deleteCase() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this case?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            key: 'case',
            accept: () => {
                this._deleteCase(this.case);
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

    _deleteCase(_case: CaseWithRelations) {
        this.caseController.deleteById({ id: _case.id }).subscribe({
            next: (res) => {
                this.patientController
                    .deleteById({
                        id: _case.patient.id,
                    })
                    .subscribe(() => {
                        if (this.case?.scan?.length) {
                            this.case.scan.forEach((scan) => {
                                this.scanController
                                    .deleteById({ id: scan.id })
                                    .subscribe();
                            });
                        }
                        this.location.back();
                    });
            },
        });
    }

    getFilename(scan) {
        let filename;
    
        // If filename exists, use it
        if (scan.filename) {
            filename = scan.filename;
        } else {
            // Extract the filename from the URL if no filename exists
            const parts = scan?.url.split('?')[0].split('/');
            filename = decodeURI(parts[parts.length - 1]);
        }
    
        // Check if it ends with 'octet-stream' and remove that
        if (filename.endsWith('octet-stream')) {
            filename = filename.replace('.octet-stream', '');
        }
        
        filename = filename.replace(/\d+_/g, '');
    
        return filename;
    }

    downloadFiles(type) {
        const scans = type === 'Admin' ? this.adminScans : this.doctorScans;
        const promises: Promise<any>[] = [];
        const zip = new JSZip();
        scans.forEach((scan) => {
            const promise = this.http
                .get(scan.url, { responseType: 'blob' })
                .toPromise()
                .then((blob) => {
                    zip.file(this.getFilename(scan), blob);
                });
            promises.push(promise);
        });

        Promise.all(promises).then(() => {
            zip.generateAsync({ type: 'blob' }).then(content => {
              saveAs(content,  `${this.patient.name}_Scans.zip`);
            });
          }).catch(err => {
            console.error('Error while downloading files: ', err);
          });
    }

    initDropzone(id) {
        const _this = this;
        console.log('this.uploadSide: ', this.uploadSide);
        let myDropzone = new Dropzone("#demo-upload"+id, {
            maxFilesize: 1024, // MB
            addRemoveLinks: true,
            autoProcessQueue: false,
            dictDefaultMessage: 'Drop Files here or click to upload',
            init: function () {
                this.on("addedfile", function (file) {
                    const sss = myDropzone?.clickableElements[0];
                    if (sss && sss.getAttribute('id')?.length) {
                        _this.uploadSide = sss.getAttribute('id').includes(1) ? 1 : 2;
                    }
                    _this.uploadedFiles.push(file);
                    _this.cdr.detectChanges();
                });
            }
        });


    }

    onUpload() {
        if (this.uploadedFiles?.length) {
            this.loading = true;
            this.cdr.detectChanges();
            this.onFileSelected(this.uploadedFiles).then((res) => {
                this.getCaseInfo(this.case.id);
                this.loading = false;
                this.cdr.detectChanges();
            });
        }
    }

    onRemove(event: any) {
        this.uploadedFiles = this.uploadedFiles.filter(
            (file) => file.name != (event.name || event.file.name)
        );
        this.cdr.detectChanges();
    }

}
