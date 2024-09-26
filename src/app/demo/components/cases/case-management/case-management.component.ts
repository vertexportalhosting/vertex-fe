import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Case, Patient, Scan } from 'src/app/api/models';
import {
    CaseControllerService,
    PatientControllerControllerService,
    ScanControllerService,
    UserControllerService,
} from 'src/app/api/services';
import { StoreService } from 'src/app/demo/service/store.service';
declare var Dropzone
@Component({
    selector: 'app-case-management',
    templateUrl: './case-management.component.html',
    styleUrl: './case-management.component.scss',
})
export class CaseManagementComponent {
    items = [
        { label: 'Case Type' },
        { label: 'Case Info' },
        { label: 'Case Review' },
    ];
    case: Case = {};
    patient: Patient = { name: '' };
    scans: any[] = [];

    caseTypes: any[] = [
        { name: 'Stage 0 - Pre-Surgery', code: '0' },
        { name: 'Stage 1 - Surgery', code: '1' },
        { name: 'Stage 2 - Prototype/ Try In', code: '2' },
        { name: 'Stage 3 - Final', code: '3' },
    ];

    activeIndex: number = 0;
    selectedCaseType = null;

    uploadedFiles: any = [];
    loading= false;
    admin = false;
    selectedDoctor = null;
    doctorList = [];
    isDarkTheme = false;

    constructor(
        private patientService: PatientControllerControllerService,
        private caseSevice: CaseControllerService,
        private scanService: ScanControllerService,
        private userService: UserControllerService,
        private http: HttpClient,
        private router: Router,
        private loader: StoreService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.admin = JSON.parse(localStorage.getItem('user'))?.role === 'admin';
        this.userService.findAllUsers().subscribe({
            next: (res) => {
              this.doctorList = res.filter(doc => doc.role !== 'admin').map((doc) => ({name: doc.username, value: doc.id}));
            },
        });
        this.isDarkTheme = JSON.parse(localStorage.getItem('theme_config'))?.colorScheme == 'dark';
    }

    isCaseTypeValid(): boolean {
        return this.selectedCaseType !== null;
    }

    toggleFastDelivery() {
        this.case.urgent = !this.case.urgent;
    }

    onFileSelect(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    onRemove(event: any) {
        this.uploadedFiles = this.uploadedFiles.filter(
            (file) => file.name != (event.name || event.file.name)
        );
    }

    uploadScans(patientId, caseId) {
        this.loader.showLoader();
        this.loading = true;
        return new Promise((resolve, reject) => {
            const uploadPromises = this.uploadedFiles.map((file) => {
                const formData = new FormData();
                formData.append('file', file);
                if (file) {
                    return this.http
                        .post('https://vertex-be.onrender.com/upload', formData)
                        .toPromise()
                        .then((url: any) => {
                            this.loader.hideLoader();
                            if (url.imageUrl) {
                                this.scans.push({
                                    filename: file.filename,
                                    url: url.imageUrl,
                                    uploadDate: new Date(),
                                    userId: JSON.parse(
                                        localStorage.getItem('user')
                                    )?.id,
                                    patientId: patientId,
                                    caseId: caseId,
                                });
                            }
                        });
                } else {
                    return Promise.resolve(); // If no file, resolve immediately
                }
            });

            Promise.all(uploadPromises)
                .then(() => resolve(true))
                .catch((error) => reject(error));
        });
    }

    prev() {
        this.activeIndex--;
        if (this.activeIndex == 1) {
            setTimeout(() => {
                this.initDropzone();
            }, 1000);
        }
    }

    next() {
        if (this.uploadedFiles.length) {
            this.uploadedFiles = this.uploadedFiles.filter(file => file.size <= 1181116006);
        }
        if (this.activeIndex < 2) {
            this.activeIndex++;
        } else {
            this.submit();
        }

        console.log('this.activeIndex: ', this.activeIndex);
        if (this.activeIndex == 1) {
            setTimeout(() => {
                this.initDropzone();
            }, 1000);
        }
    }

    submit() {
        console.log(this.uploadedFiles)
        // this.loading = true;
        // this.patient = {
        //     ...this.patient,
        //     userId: JSON.parse(localStorage.getItem('user'))?.id,
        // };

        // this.patientService
        //     .create({ body: this.patient })
        //     .subscribe((patient) => {
        //         this.case = {
        //             ...this.case,
        //             patientId: patient.id,
        //             userId: this.selectedDoctor ? this.selectedDoctor : JSON.parse(localStorage.getItem('user'))?.id,
        //         } as any;
        //         this.caseSevice
        //             .create({ body: this.case })
        //             .subscribe((acase) => {
        //                 this.uploadScans(patient.id, acase.id).then((res) => {
        //                     this.scans.forEach((scan) => {
        //                         this.scanService.create({body: scan}).subscribe();
        //                     });
        //                     this.loading = false;
        //                     this.router.navigate(['/case/list']);
        //                 }, err => {
        //                     this.loading = false;
        //                 });
        //             });
        //     });
    }

    initDropzone() {
        const _this = this;
        let myDropzone = new Dropzone("#demo-upload", {
            maxFilesize: 1024, // MB
            addRemoveLinks: true,
            autoProcessQueue: false,
            dictDefaultMessage: 'Drop Files here or click to upload',
            init: function () {
                this.on("addedfile", function (file) {
                    console.log("File added:", file);
                    _this.uploadedFiles.push(file);
                    _this.cdr.detectChanges();
                    console.log(this.uploadedFiles, _this.uploadedFiles)
                    });
            }
        });
    }
}
