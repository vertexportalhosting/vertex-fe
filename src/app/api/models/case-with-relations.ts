/* tslint:disable */
/* eslint-disable */
import { PatientWithRelations } from '../models/patient-with-relations';
import { ScanWithRelations } from '../models/scan-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: CaseWithRelations, schemaOptions: { includeRelations: true })
 */
export interface CaseWithRelations {
  case_status?: string;
  case_type?: string;
  deleted?: boolean;
  delivery_date?: string;
  foreignKey?: any;
  id?: number;
  isStageFourComplete?: boolean;
  isStageOneComplete?: boolean;
  isStageThreeComplete?: boolean;
  isStageTwoComplete?: boolean;
  notes?: string;
  patient?: PatientWithRelations;
  patientId?: number;
  payment_status?: string;
  scan?: Array<ScanWithRelations>;
  urgent?: boolean;
  user?: UserWithRelations;
  userId?: string;
}
