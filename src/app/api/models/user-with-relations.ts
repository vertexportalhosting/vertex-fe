/* tslint:disable */
/* eslint-disable */
import { PatientHistoryWithRelations } from '../models/patient-history-with-relations';
import { ScanWithRelations } from '../models/scan-with-relations';
import { UserCredentialsWithRelations } from '../models/user-credentials-with-relations';

/**
 * (tsType: UserWithRelations, schemaOptions: { includeRelations: true })
 */
export interface UserWithRelations {
  active?: boolean;
  email: string;
  emailVerified?: boolean;
  id?: string;
  password?: string;
  realm?: string;
  role?: string;
  updatedHistories?: Array<PatientHistoryWithRelations>;
  uploadedDocuments?: Array<ScanWithRelations>;
  userCredentials?: UserCredentialsWithRelations;
  username?: string;
  verificationToken?: string;

  [key: string]: any;
}
