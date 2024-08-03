/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Scan, 'id'>, schemaOptions: { title: 'NewScans', exclude: [ 'id' ] })
 */
export interface NewScans {
  caseId?: number;
  filename?: string;
  patientId?: number;
  uploadDate: string;
  url: string;
  userId?: string;
}
