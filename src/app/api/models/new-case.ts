/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Case, 'id'>, schemaOptions: { title: 'NewCase', exclude: [ 'id' ] })
 */
export interface NewCase {
  case_status?: string;
  case_type?: string;
  deleted?: boolean;
  delivery_date?: string;
  notes?: string;
  patientId?: number;
  payment_status?: string;
  urgent?: boolean;
  userId?: string;
}
