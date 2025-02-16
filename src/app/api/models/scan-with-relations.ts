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
  stage?: number;
  uploadDate: string;
  upload_table?: number;
  url: string;
  user?: UserWithRelations;
  userId?: string;
}
