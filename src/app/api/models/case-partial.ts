/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Partial<Case>, schemaOptions: { partial: true })
 */
export interface CasePartial {
  case_status?: string;
  case_type?: string;
  created_at?: string;
  created_by?: string;
  deleted?: boolean;
  delivery_date?: string;
  doctor_name?: string;
  id?: number;
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
