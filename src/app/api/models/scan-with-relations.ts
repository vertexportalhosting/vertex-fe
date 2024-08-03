/* tslint:disable */
/* eslint-disable */
import { CaseWithRelations } from '../models/case-with-relations';
import { PatientWithRelations } from '../models/patient-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: ScanWithRelations, schemaOptions: { includeRelations: true })
 */
export interface ScanWithRelations {
  case?: CaseWithRelations;
  caseId?: number;
  filename?: string;
  foreignKey?: any;
  id?: number;
  patient?: PatientWithRelations;
  patientId?: number;
  uploadDate: string;
  url: string;
  user?: UserWithRelations;
  userId?: string;
}
