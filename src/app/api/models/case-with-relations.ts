/* tslint:disable */
/* eslint-disable */
import { PatientHistoryWithRelations } from '../models/patient-history-with-relations';
import { PatientWithRelations } from '../models/patient-with-relations';
import { ScanWithRelations } from '../models/scan-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: CaseWithRelations, schemaOptions: { includeRelations: true })
 */
export interface CaseWithRelations {
  case_status?: string;
  case_type?: string;
  created_at?: string;
  created_by?: string;
  deleted?: boolean;
  delivery_date?: string;
  delivery_date_stage_0?: string;
  delivery_date_stage_1?: string;
  delivery_date_stage_2?: string;
  delivery_date_stage_3?: string;
  doctor_name?: string;
  foreignKey?: any;
  history?: Array<PatientHistoryWithRelations>;
  id?: number;
  isStageFourComplete?: boolean;
  isStageOneComplete?: boolean;
  isStageThreeComplete?: boolean;
  isStageTwoComplete?: boolean;
  isViewedByAdmin?: boolean;
  isViewedByDoctor?: boolean;
  notes?: string;
  patient?: PatientWithRelations;
  patientId?: number;
  patient_name?: string;
  payment_status?: string;
  scan?: Array<ScanWithRelations>;
  updated_at?: string;
  updated_at2?: string;
  updated_by?: string;
  urgent?: boolean;
  user?: UserWithRelations;
  userId?: string;
}
