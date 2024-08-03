export interface CaseType {
    name: string;
    code: string;
  }

  export interface ICase {
    id: string;
    case_type: string;
    delivery_date: string;
    urgent: boolean;
    notes: string;
    deleted: boolean;
    patient: string;
    user: string;
    foreignKey: string;
    
}


  export class CaseInfo {
    name: string;
    caseNotes: string;
    isFastDelivery: boolean;
    scans: any[];
    doctorNotes: string;
    surgicalType: string;
    user: string;
  }