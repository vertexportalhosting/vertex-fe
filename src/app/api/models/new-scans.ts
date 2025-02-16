/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Scan, 'id'>, schemaOptions: { title: 'NewScans', exclude: [ 'id' ] })
 */
export interface NewScans {
  caseId?: number;
  filename?: string;
  patientId?: number;
  stage?: number;
  uploadDate: string;
  upload_table?: number;
  url: string;
  userId?: string;
}
