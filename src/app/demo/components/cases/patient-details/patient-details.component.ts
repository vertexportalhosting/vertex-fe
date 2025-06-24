import {
    AfterViewInit,
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
    styleUrls: ['./patient-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDetailsComponent implements AfterViewInit {
    case: CaseWithRelations = {} as CaseWithRelations;

    @ViewChild('qrCanvas', { static: false })
    qrCanvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('pdfContainer', { static: false })
    pdfContainer!: ElementRef<HTMLDivElement>;

    constructor(private route: ActivatedRoute) {
        const case_id = this.route.snapshot.params['id'];
        if (case_id) {
            this.getCaseInfo();
        }
    }

    ngAfterViewInit() {}

    getCaseInfo() {
        const data = localStorage.getItem('caseToPrint');
        if (!data) return;

        this.case = JSON.parse(data);

        setTimeout(() => {
            // 1. Generate QR
            QRCode.toCanvas(
                this.qrCanvas.nativeElement,
                `https://vertexdentalstudiocases.com/case/view/${this.case.id}`,
                {
                    width: 350,
                    margin: 2,
                    color: { dark: '#000000', light: '#ffffff' },
                },
                (error) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    // 2. Generate PDF after QR is painted
                    const doc = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4',
                    });

                    doc.html(this.pdfContainer.nativeElement, {
                        callback: (pdf) => {
                            const blob = pdf.output('blob');

                            // ✅ Universal fallback using FileReader
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const base64 = reader.result as string;

                                // open in a new tab (most reliable across iOS, Android, Desktop)
                                const win = window.open();
                                if (win) {
                                    win.document.write(
                                        `<iframe width='100%' height='100%' src='${base64}'></iframe>`
                                    );
                                } else {
                                    // fallback: force location change
                                    window.location.href = base64;
                                }

                                localStorage.removeItem('caseToPrint');
                                setTimeout(() => window.close(), 1000);
                            };

                            reader.readAsDataURL(blob);
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
                }
            );
        }, 300);
    }
}
