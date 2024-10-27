/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Partial<Case>, schemaOptions: { partial: true })
 */
export interface CasePartial {
  case_status?: string;
  case_type?: string;
  deleted?: boolean;
  delivery_date?: string;
  id?: number;
  isStageFourComplete?: boolean;
  isStageOneComplete?: boolean;
  isStageThreeComplete?: boolean;
  isStageTwoComplete?: boolean;
  notes?: string;
  patientId?: number;
  payment_status?: string;
  urgent?: boolean;
  userId?: string;
}
