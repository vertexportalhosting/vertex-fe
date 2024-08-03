/* tslint:disable */
/* eslint-disable */
import { PatientHistoryWithRelations } from '../models/patient-history-with-relations';
import { ScanWithRelations } from '../models/scan-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: PatientWithRelations, schemaOptions: { includeRelations: true })
 */
export interface PatientWithRelations {
  deleted?: boolean;
  foreignKey?: any;
  gender?: string;
  history?: Array<PatientHistoryWithRelations>;
  id?: number;
  name: string;
  notes?: string;
  scan?: Array<ScanWithRelations>;
  user?: UserWithRelations;
  userId?: string;
}
