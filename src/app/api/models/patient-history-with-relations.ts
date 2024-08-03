/* tslint:disable */
/* eslint-disable */
import { CaseWithRelations } from '../models/case-with-relations';
import { PatientWithRelations } from '../models/patient-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: PatientHistoryWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PatientHistoryWithRelations {
  actionDate: string;
  actionType: string;
  case?: CaseWithRelations;
  caseId?: number;
  details?: string;
  foreignKey?: any;
  id?: number;
  patient?: PatientWithRelations;
  patientId?: number;
  user?: UserWithRelations;
  userId?: string;
}
