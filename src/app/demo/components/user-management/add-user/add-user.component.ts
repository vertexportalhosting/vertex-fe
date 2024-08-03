import { Component } from '@angular/core';
import { CaseInfo, CaseType } from 'src/app/models/case.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  items = [
    { label: 'Case Type' },
    { label: 'Case Info' },
    { label: 'Case Review' }
  ];
  caseInfo: CaseInfo = new CaseInfo();

  caseTypes: CaseType[] = [
    { name: 'Surgical Guide', code: 'surgicalguide' },
    { name: 'Crowns', code: 'crowns' },
    { name: 'Implant Crowns', code: 'implantcrowns' }
  ];


  activeIndex: number = 0;
  selectedCaseType: CaseType = null;


  constructor() {
    this.caseInfo = new CaseInfo();
  }

  isCaseTypeValid(): boolean {
    return this.selectedCaseType !== null;
  }

  toggleFastDelivery() {
    this.caseInfo.isFastDelivery = !this.caseInfo.isFastDelivery;
  }

  onFileSelect(event: any) {
    const files = event.files;
    this.caseInfo.scans = [];

    this.caseInfo.scans.push(files);
  }

  prev() {
    this.activeIndex--;
  }

  next() {
    if (this.activeIndex < 2) {
      this.activeIndex++;
    } else {
      this.submit();
    }
  }

  submit() {
    console.log(this.caseInfo);
  }

}
