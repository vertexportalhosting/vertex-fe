import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseWithRelations } from 'src/app/api/models';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrl: './patient-details.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent {
    case: CaseWithRelations = {} as CaseWithRelations;
    @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('pdfContainer') pdfContainer!: ElementRef<HTMLCanvasElement>;

    constructor(private route: ActivatedRoute) {
        const case_id = this.route.snapshot.params['id'];
        if (case_id) {
            this.getCaseInfo();
        }
    }

    ngAfterViewInit() {}

    getCaseInfo() {
        const data = localStorage.getItem('caseToPrint');
        if (data) {
            this.case = { ...JSON.parse(data) } as any;

            setTimeout(() => {
                QRCode.toCanvas(
                    this.qrCanvas?.nativeElement,
                    `https://vertexdentalstudiocases.com/case/view/${this.case.id}`,
                    {
                        width: 150,
                        margin: 2,
                        color: {
                            dark: '#000000',
                            light: '#ffffff',
                        },
                    },
                    (error) => {
                        if (error) console.error(error);
                    }
                );
                const doc = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });

                doc.html(this.pdfContainer.nativeElement, {
                    callback: (doc) => {
                        doc.save(`case-${this.case.id}.pdf`);
                        localStorage.removeItem('caseToPrint');
                        window.close();
                    },
                    x: 10,
                    y: 10,
                    html2canvas: {
                        scale: 0.25,
                        useCORS: true,
                    },
                    width: 190,
                    windowWidth: 800,
                });
            }, 100);
        }
    }
}
