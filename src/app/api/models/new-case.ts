/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Case, 'id'>, schemaOptions: { title: 'NewCase', exclude: [ 'id' ] })
 */
export interface NewCase {
  case_status?: string;
  case_type?: string;
  created_at?: string;
  created_by?: string;
  deleted?: boolean;
  delivery_date?: string;
  doctor_name?: string;
  isStageFourComplete?: boolean;
  isStageOneComplete?: boolean;
  isStageThreeComplete?: boolean;
  isStageTwoComplete?: boolean;
  isViewedByAdmin?: boolean;
  isViewedByDoctor?: boolean;
  notes?: string;
  patientId?: number;
  patient_name?: string;
  payment_status?: string;
  updated_at?: string;
  updated_by?: string;
  urgent?: boolean;
  userId?: string;
}
